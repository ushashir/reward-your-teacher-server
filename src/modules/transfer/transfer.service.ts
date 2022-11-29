import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginateAndSort } from '../../common/helpers';
import { LeanUser, UserDocument } from '../user/user.interface';
import { GetTransfersDto } from './dtos/GetTransfersDto';
import { TransferDocument } from './interfaces/transfer.interface';
import { Transfer } from './schemas/transfer.schema';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,
  ) {}

  public createTransfer(
    senderId: UserDocument['_id'],
    receiverId: UserDocument['_id'] | string,
    amount: number,
  ) {
    const transfer = new this.transferModel({
      senderId,
      receiverId,
      amount,
    });

    return transfer.save().then((transfer) => transfer.toObject());
  }

  async getTransfers(user: LeanUser, query: GetTransfersDto) {
    const { sort, page, limit } = query;

    const filters = {
      senderId: user._id,
    };

    return paginateAndSort({
      model: this.transferModel,
      filters,
      sort,
      page,
      limit,
      populate: [
        {
          path: 'receiverId',
        },
      ],
    });
  }
}
