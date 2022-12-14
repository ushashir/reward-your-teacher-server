import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { DbSchemas } from '../../../common/constants';
import { User } from '../../user/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Transfer {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: DbSchemas.user,
  })
  senderId: string | User; // student

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: DbSchemas.user,
  })
  receiverId: string | User; // teacher

  @Prop({
    type: Number,
  })
  amount: number;

  @Prop({
    type: Boolean,
  })
  appreciation: boolean;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
