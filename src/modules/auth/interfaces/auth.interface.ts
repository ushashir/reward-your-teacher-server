import { Document } from 'mongoose';
import { UserDocument } from '../../user/user.interface';

export interface RefreshTokenDocument extends Document {
  userId: string;
  isRevoked: boolean;
  userAgent: string;
  expires: Date;
}

export interface JwtPayload {
  sub: UserDocument['_id'];
  jwtid: RefreshTokenDocument['_id'];
}
