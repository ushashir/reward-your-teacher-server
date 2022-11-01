import { LeanDocument } from 'mongoose';
import { GenderEnum } from 'src/common/enums';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
}

export type LeanUser = LeanDocument<UserDocument>;
