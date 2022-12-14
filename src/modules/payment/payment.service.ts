import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, lastValueFrom, map, tap, throwError } from 'rxjs';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { PaymentStatusEnum } from '../../common/enums';
import { paginateAndSort } from '../../common/helpers';
import { IEnvironment } from '../../common/interfaces';
import { LeanUser } from '../user/user.interface';
import { WalletService } from '../wallet/wallet.service';
import { GetPaymentsDto } from './dtos/GetPaymentsDto';
import { InitializePaymentDto } from './dtos/InitializePaymentDto';
import { VerifyPaymentDto } from './dtos/VerifyPaymentDto';

import {
  PaymentDocument,
  PaystackSuccess,
} from './interface/payment.interface';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectModel(DbSchemas.payment)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly configService: ConfigService<IEnvironment>,
    private readonly httpService: HttpService,
    private readonly walletService: WalletService,
  ) {}

  async initializePayment(
    user: LeanUser,
    initializePaymentDto: InitializePaymentDto,
  ) {
    const { _id: userId } = user;
    const { amount } = initializePaymentDto;

    const reference = await this.generateReference();

    const createdPayment = await this.paymentModel.create({
      userId,
      amount,
      reference,
    });

    const createdPaymentAsObject = createdPayment.toObject();

    return {
      ...createdPaymentAsObject,
      publicKey: this.configService.get('PAYSTACK_PUBLIC_KEY'),
    };
  }

  // curl https://api.paystack.co/transaction/verify/:reference
  // -H "Authorization: Bearer YOUR_SECRET_KEY"
  // -X GET

  async verifyPayment(user: LeanUser, verifyPaymentDto: VerifyPaymentDto) {
    const { _id: userId } = user;
    const { reference } = verifyPaymentDto;
    const paystackSecretKey = this.configService.get('PAYSTACK_SECRET_KEY', {
      infer: true,
    });

    const existingPayment = await this.paymentModel.findOne({
      userId,
      reference,
    });

    if (!existingPayment) {
      throw new BadRequestException(ErrorMessages.PAYMENT_NOT_INITIALIZED);
    }

    if (existingPayment.status !== PaymentStatusEnum.PENDING) {
      throw new BadRequestException(ErrorMessages.PAYMENT_ALREADY_VERIFIED);
    }

    // verifying with paystack

    const response = await lastValueFrom(
      this.httpService
        .get<PaystackSuccess>(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${paystackSecretKey}`,
            },
          },
        )
        .pipe(
          map((response) => response.data),
          tap((response) => {
            this.logger.log('paystack response => ', response);
          }),
          catchError((error) => {
            this.logger.error('paystack error => ', error);
            return throwError(() => error);
          }),
        ),
    );

    const {
      data: { customer, status, amount },
      message,
    } = response;

    const paymentAmount = amount / 100;

    if (customer.email !== user.email) {
      throw new BadRequestException(ErrorMessages.PAYMENT_EMAIL_MISMATCH);
    }

    existingPayment.status = status as PaymentStatusEnum;

    switch (status) {
      case 'success':
        existingPayment.amount = paymentAmount;

        await existingPayment.save();

        await this.walletService.fundWallet(userId.toString(), paymentAmount);
        break;

      default:
        await existingPayment.save();
        break;
    }

    return {
      message,
      ...existingPayment.toObject(),
    };
  }

  private async getPaymentByReference(reference: string) {
    return this.paymentModel.findOne({ reference }).exec();
  }

  private async generateReference() {
    const digits = '0123456789';
    let generatedSeed = '';
    const referenceAppend = 'RTYN-PYK-';

    for (let i = 0; i < 8; i++) {
      generatedSeed += digits.charAt(Math.floor(Math.random() * 10));
    }

    const reference = referenceAppend + generatedSeed;

    const existingReference = await this.getPaymentByReference(reference);

    if (!existingReference) {
      return reference;
    }

    this.generateReference();
  }

  async getPayments(user: LeanUser, query: GetPaymentsDto) {
    const { sort, page, limit } = query;

    const filters = {
      status: PaymentStatusEnum.SUCCESS,
      userId: user._id,
    };

    return paginateAndSort({
      model: this.paymentModel,
      filters,
      sort,
      page,
      limit,
    });
  }
}
