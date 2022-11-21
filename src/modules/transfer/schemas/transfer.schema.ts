import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { DbSchemas } from '../../../common/constants';
import { UserDocument } from '../../user/user.interface';

@Schema({
  timestamps: true,
})
export class Transfer {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: DbSchemas.user,
  })
  senderId: string | UserDocument; // student

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: DbSchemas.user,
  })
  receiverId: string | UserDocument; // teacher

  @Prop({
    type: Number,
  })
  amount: number;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
