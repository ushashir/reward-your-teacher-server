import { Document, ObjectId } from 'mongoose';

export interface WithdrawalDocument extends Document {
  userId: string;
  amount: number;
}



