import * as bcrypt from 'bcryptjs';
import { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
import { UserRolesEnum, GenderEnum } from '../../../common/enums';

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
      // required: true,
      select: false,
    },
    userType: {
      type: String,
      // required: true, // because during google signup we won't know yet who you are
      enum: [UserRolesEnum.TEACHER, UserRolesEnum.STUDENT],
      uppercase: true,
    },
    gender: {
      type: String,
      enum: [GenderEnum.FEMALE, GenderEnum.MALE],
      uppercase: true,
    },
    phoneNumber: {
      type: Number,
    },
    school: {
      type: String,
    },
    years: {
      type: String,
    },
    subject: {
      type: String,
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
