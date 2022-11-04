import { Schema } from 'mongoose';
import { GenderEnum } from 'src/common/enums';

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: [GenderEnum.MALE, GenderEnum.FEMALE],
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);
