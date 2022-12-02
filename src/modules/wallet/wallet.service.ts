import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserRolesEnum } from '../../common/enums';
import { LeanUser, UserDocument } from '../user/user.interface';
import { LeanWallet, WalletDocument } from './interfaces/wallet.interface';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(DbSchemas.wallet)
    private readonly walletModel: Model<WalletDocument>,
  ) {}

  async createWallet(user: LeanUser, balance?: number): Promise<LeanWallet> {
    const wallet = await this.walletModel.create({
      userId: user._id,
      totalMoneyReceived: 0.0,
      balance: balance || 0.0,
    });

    return wallet.toObject();
  }

  async getWalletBalance(id: string) {
    const wallet = await this.walletModel.findOne({ userId: id });
    const { balance } = wallet;

    return {
      message: 'Balance fetched successfully',
      walletBalance: balance,
    };
  }

  async withdraw(amount: number, id: string) {
    //TODO: please use a dto for this controller and do your validations there
    const wallet = await this.walletModel.findOne({ userId: id });
    const { balance } = wallet;

    if (amount <= 0) {
      throw new BadRequestException(ErrorMessages.INVALID_WITHDRAWAL_AMOUNT);
    }

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

  async sendMoney(
    user: UserDocument,
    amount: number,
    destination: string,
    id: string,
  ) {
    // if (user.userType !== UserRolesEnum.STUDENT) {
    //   throw new BadRequestException(ErrorMessages.TEACHER_CANNOT_TRANSFER);
    // }

    const sender = await this.walletModel.findOne({ userId: id });

    const receiver = await this.walletModel.findOne(
      { userId: destination },
      // {
      //   populate: {
      //     path: 'userId',
      //   },
      // },
    );

    if (!sender || !receiver || destination === id) {
      throw new BadRequestException(ErrorMessages.INVALID_REQUEST);
    }

    // if ((receiver.userId as LeanUser).userType !== UserRolesEnum.TEACHER) {
    //   throw new BadRequestException(ErrorMessages.CANNOT_TRANSFER_TO_STUDENT);
    // }

    const { balance } = sender;
    const receiverBalance = receiver.balance;

    if (amount <= 0) {
      throw new BadRequestException(ErrorMessages.INVALID_WITHDRAWAL_AMOUNT);
    }
    if (amount > balance) {
      throw new BadRequestException(ErrorMessages.INSUFFICIENT_FUND);
    }

    const senderNewBalance = balance - amount;
    const receiverNewBalance = receiverBalance + amount;

    await this.walletModel.findByIdAndUpdate(sender._id, {
      balance: senderNewBalance,
    });

    const receiversTotalMoneyRecieved = receiver.totalMoneyReceived + amount;
    console.log(receiversTotalMoneyRecieved);


    await this.walletModel.findByIdAndUpdate(receiver._id, {
      balance: receiverNewBalance,
      totalMoneyReceived: receiversTotalMoneyRecieved,
    });

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
}
