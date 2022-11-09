import { Schema } from 'mongoose';

export const WalletSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    default: 0.0
  },
});