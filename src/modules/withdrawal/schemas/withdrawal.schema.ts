import { Schema } from 'mongoose';

export const WithdrawalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "failed", "completed"],
      default: "pending",
      required: true
    }
  },
  {
    timestamps: true,
  },
);
