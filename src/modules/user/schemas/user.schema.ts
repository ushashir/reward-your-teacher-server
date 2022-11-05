import * as bcrypt from 'bcrypt';
import { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
import { UserRolesEnum } from '../../../common/enums';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      email: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userType: {
      type: String,
      required: true,
      enum: [UserRolesEnum.TEACHER, UserRolesEnum.STUDENT],
      uppercase: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (this.isModified('password')) {
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(this.password, saltOrRounds);
      this.password = passwordHash;
    }

    return next();
  },
);
