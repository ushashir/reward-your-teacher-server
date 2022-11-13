import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserDocument } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { WalletDocument } from './interfaces/wallet.interface';

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(DbSchemas.wallet)
        private readonly walletModel: Model<WalletDocument>,
    ) {}

    async createWallet (user: UserDocument){
        if(user.userType === 'TEACHER'){
            return await this.walletModel.create({
                userId: user._id,
                userType: user.userType,
                totalMoneyRecieved: 0.0,
                balance: 0.0
            })
        } else{
            return await this.walletModel.create({
                userId: user._id,
                userType: user.userType,
                balance: 0.0
            })
        }

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

    async sendMoney(user: UserDocument, amount: number, destination: string, id: string){

        if(user.userType !== 'STUDENT'){
            throw new BadRequestException(ErrorMessages.TEACHER_CANNOT_TRANSFER);
        }

        const sender = await this.walletModel.findOne({userId: id})
        const reciever = await this.walletModel.findOne({userId: destination})
        
        if(!sender || !reciever || destination === id){
            throw new BadRequestException(ErrorMessages.INVALID_REQUEST);
        }

        if(reciever.userType !== 'TEACHER'){
            throw new BadRequestException(ErrorMessages.CANNOT_TRANSFER_TO_STUDENT);
        }

        const { balance } = sender
        const recieverBalance = reciever.balance

        if(amount <= 0){
            throw new BadRequestException(ErrorMessages.INVALID_WITHDRAWAL_AMOUNT);
        }
        if(amount > balance){
            throw new BadRequestException(ErrorMessages.INSUFFICIENT_FUND);
        }

        const senderNewBalance = balance - amount
        const recieverNewBalance = recieverBalance + amount

        await this.walletModel.findByIdAndUpdate(sender._id, {
            balance: senderNewBalance
        })

        const recieversTotalMoneyRecieved = reciever.totalMoneyRecieved + amount

        await this.walletModel.findByIdAndUpdate(reciever._id, {
            balance: recieverNewBalance,
            totalMoneyRecieved: recieversTotalMoneyRecieved
        })

        return {
            message: `Transfer of ${amount} was successful`
        }
    }

    async getTotalMoneyRecieved(user: UserDocument){

        if(user.userType !== 'TEACHER'){
            throw new BadRequestException(ErrorMessages.CANNOT_GET_FOR_STUDENT);
        }

        const record = await this.walletModel.findOne({userId: user._id})

        if(!record){
            throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
        }

        const { totalMoneyRecieved } = record

        return { totalMoneyRecieved }
    }

}
