import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/user.interface';
import { TransferDocument } from './interfaces/transfer.interface';
import { Transfer } from './schemas/transfer.schema';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Transfer.name)
    public readonly transferModel: Model<TransferDocument>,
  ) {}

  public createTransfer(
    senderId: UserDocument['_id'],
    receiverId: UserDocument['_id'] | string,
    amount: number,
    appreciation: boolean,
  ) {
    const transfer = new this.transferModel({
      senderId,
      receiverId,
      amount,
      appreciation,
    });

    return transfer.save().then((transfer) => transfer.toObject());
  }
}
