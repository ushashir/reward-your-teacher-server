import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserRolesEnum } from '../../common/enums';
import { TransferService } from '../transfer/transfer.service';
import { LeanUser, UserDocument } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { LeanWallet, WalletDocument } from './interfaces/wallet.interface';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @InjectModel(DbSchemas.wallet)
    private readonly walletModel: Model<WalletDocument>,
    private readonly transferService: TransferService,
    private readonly userService: UserService,
  ) {}

  async createWallet(user: LeanUser, balance?: number): Promise<LeanWallet> {
    const wallet = await this.walletModel.create({
      userId: user._id,
      totalMoneyReceived: 0.0,
      balance: balance || 0.0,
    });

    return wallet.toObject();
  }

  async getWallet(id: string) {
    const wallet = await this.walletModel.findOne({ userId: id });

    return {
      message: 'Balance fetched successfully',
      wallet: wallet.toObject(),
    };
  }

  async withdraw(amount: number, id: string) {
    //TODO: please use a dto for this controller and do your validations there
    const wallet = await this.walletModel.findOne({ userId: id });
    const { balance } = wallet;

    if (amount > balance) {
      throw new BadRequestException(ErrorMessages.INSUFFICIENT_FUND);
    }

    const newBalance = balance - amount;

    wallet.balance = newBalance;

    await wallet.save();

    return {
      message: `Withdrawal of ${amount} successful`,
    };
  }

  async sendMoney(user: UserDocument, amount: number, destination: string) {
    if (user.userType !== UserRolesEnum.STUDENT) {
      throw new BadRequestException(ErrorMessages.TEACHER_CANNOT_TRANSFER);
    }

    const senderWallet = await this.getWalletByUserId(user._id.toString());

    const receiverWallet = await this.getWalletByUserId(destination, {
      path: 'userId',
    });

    if (
      !senderWallet ||
      !receiverWallet ||
      destination === user._id.toString()
    ) {
      throw new BadRequestException(ErrorMessages.INVALID_REQUEST);
    }

    if (
      (receiverWallet.userId as LeanUser).userType !== UserRolesEnum.TEACHER
    ) {
      throw new BadRequestException(ErrorMessages.CANNOT_TRANSFER_TO_STUDENT);
    }

    const { balance } = senderWallet;

    if (amount > balance) {
      throw new BadRequestException(ErrorMessages.INSUFFICIENT_FUND);
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;
    receiverWallet.totalMoneyReceived += amount;

    await senderWallet.save();
    await receiverWallet.save();

    this.transferService.createTransfer(user._id, destination, amount);

    return {
      message: `Transfer of ${amount} was successful`,
    };
  }

  async getTotalMoneyReceived(user: UserDocument) {
    if (user.userType !== UserRolesEnum.TEACHER) {
      throw new BadRequestException(ErrorMessages.CANNOT_GET_FOR_STUDENT);
    }

    const record = await this.walletModel.findOne({ userId: user._id });

    if (!record) {
      throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
    }

    const { totalMoneyReceived } = record;

    return { totalMoneyReceived };
  }

  async fundWallet(user: LeanUser, amount: number) {
    const existingWallet = await this.walletModel.findOne({ userId: user._id });

    if (!existingWallet) {
      const createdWallet = await this.createWallet(user, amount);

      return createdWallet;
    }

    existingWallet.balance += amount;

    await existingWallet.save();

    return existingWallet.toObject();
  }

  // this tries to get a wallet by user id, and if it does not exist creates the wallet
  private async getWalletByUserId(
    userId: string,
    populate?: PopulateOptions | (PopulateOptions | string)[],
  ) {
    const query = this.walletModel.findOne({ userId });

    if (populate) {
      query.populate(populate);
    }

    const wallet = await query.exec();

    if (!wallet) {
      const user = await this.userService.getUserById(userId);

      await this.createWallet(user);

      return this.getWalletByUserId(userId, populate);
    }

    return wallet;
  }
}
