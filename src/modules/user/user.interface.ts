import { LeanDocument } from 'mongoose';
import { UserRolesEnum } from '../../common/enums';

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  userType: UserRolesEnum;
}

export type LeanUser = LeanDocument<UserDocument>;
