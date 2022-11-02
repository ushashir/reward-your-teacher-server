import { LeanDocument } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export type LeanUser = LeanDocument<UserDocument>;
