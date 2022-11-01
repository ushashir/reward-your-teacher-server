import { LeanDocument } from 'mongoose';
import { GenderEnum } from 'src/common/enums';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export type LeanUser = LeanDocument<UserDocument>