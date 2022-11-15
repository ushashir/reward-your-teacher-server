import { Schema } from 'mongoose';
import { PaymentStatusEnum } from '../../../common/enums';

export const PaymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'NGN',
      enum: ['NGN', 'GHS', 'ZAR', 'USD'],
    },
    status: {
      type: String,
      required: true,
      default: PaymentStatusEnum.PENDING,
      enum: [...Object.values(PaymentStatusEnum)],
    },
  },
  {
    timestamps: true,
  },
);
