import { HydratedDocument, LeanDocument } from 'mongoose';
import { User } from './schemas/user.schema';

export type UserDocument = HydratedDocument<User>;

export type LeanUser = LeanDocument<UserDocument>;

export interface UserFiles {
  profilePicture: Express.Multer.File[];
}
