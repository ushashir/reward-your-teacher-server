import { Document, LeanDocument } from 'mongoose';
import { LeanUser } from '../../user/user.interface';

export interface WalletDocument extends Document {
  userId: string | LeanUser;
  balance: number;
  totalMoneyReceived?: number;
}

export type LeanWallet = LeanDocument<WalletDocument>;
