import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessages } from 'src/common/constants';
import { paginateAndSort } from '../../common/helpers';
import { LeanUser, UserDocument } from '../user/user.interface';
import { GetTransfersDto } from './dtos/GetTransfersDto';
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

  async mostRecentMoneyReceived(userId: UserDocument['_id']) {
    const transfer = await this.transferModel
      .find({ receiverId: userId })
      .sort({ createdAt: -1 })
      .exec();

    if (!transfer) {
      throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
    }
    return transfer;
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
