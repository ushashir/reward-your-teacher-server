import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserDocument } from '../user/user.interface';
import { CreateWalletDto } from './dtos/WalletDto';
import { WalletDocument } from './interfaces/wallet.interface';

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(DbSchemas.wallet)
        private readonly walletModel: Model<WalletDocument>,
    ) {}

    async createWallet (user: UserDocument){
        return await this.walletModel.create({
            userId: user._id,
            balance: 0.0
        })
    }

    async getWalletBalance(id: string){

        const user = await this.walletModel.findOne({userId: id})
        const { balance } = user

        return {
            message: 'Balance fetched successfully',
            walletBalance: balance
        }
    }

    async withdraw(amount: number, id: string){
        const user = await this.walletModel.findOne({userId: id})
        const { balance } = user

        if(amount <= 0){
            throw new BadRequestException(ErrorMessages.INVALID_WITHDRAWAL_AMOUNT);
        }
        if(amount > balance){
            throw new BadRequestException(ErrorMessages.INSUFFICIENT_FUND);
        }

        const newBalance = balance - amount

        await this.walletModel.findByIdAndUpdate(user._id, {
            balance: newBalance
        })

        return {
            message: `Withdrawal of ${amount} successful`
        }
    }
    
}
