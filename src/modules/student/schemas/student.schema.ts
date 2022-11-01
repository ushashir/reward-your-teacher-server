import { Schema } from 'mongoose';

export const StudentSchema = new Schema(
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
      unique: true
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
