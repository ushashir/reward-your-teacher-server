import { Schema } from 'mongoose';

export const RewardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
