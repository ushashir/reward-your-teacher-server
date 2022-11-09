import { Document } from 'mongoose';

export interface WalletDocument extends Document {
  userId: string;
  balance: number;
}