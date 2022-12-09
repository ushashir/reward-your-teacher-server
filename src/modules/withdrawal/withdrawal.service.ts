import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { WalletService } from '../wallet/wallet.service';
import { WithdrawalDocument } from './interfaces/withdrawal.interface';


@Injectable()
export class WithdrawalService {
  constructor(
    @InjectModel(DbSchemas.withdrawal)
    private readonly withdrawalModel: Model<WithdrawalDocument>,
    readonly walletService: WalletService,
  ) { }


  async withdraw(amount: number, id: string) {
    //TODO: please use a dto for this controller and do your validations there
    const walletExist = await this.walletService.getWallet(id);

    const { wallet } = walletExist;

    const { balance } = wallet;

    if (amount > balance) {
      throw new BadRequestException(ErrorMessages.INSUFFICIENT_FUND);
    }

    const newBalance = balance - amount;

    const withdraw = this.withdrawalModel.create({ userId: id, amount });
    if (!withdraw) {
      const newBalance = balance + amount;
      const newBalance2 = await this.walletService.updateWalletBalance(newBalance, id);
      const withdraw = this.withdrawalModel.findOneAndUpdate({ userId: id }, { amount, status: "failed" });
      throw new BadRequestException(ErrorMessages.WITHDRAWAL_FAILED);
    }

    const newBalance2 = await this.walletService.updateWalletBalance(newBalance, id);
    const withdrawalUpdate = await this.withdrawalModel.findOneAndUpdate({ userId: id }, { amount, status: "completed" });

    const withdrawalExist = withdrawalUpdate.toObject();

    return {
      message: `Withdrawal of ${amount} successful`,
      withdrawalExist
    };
  }

  async withdrawHistory(id: string) {
    const wallet = await this.withdrawalModel.find({ userId: id }).sort({ createdAt: -1 }).exec();

    if (!wallet) {
      throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
    }

    return wallet;
  };
}
