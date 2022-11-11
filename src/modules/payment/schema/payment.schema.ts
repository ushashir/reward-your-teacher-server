import {  Schema } from 'mongoose';


export const PaymentSchema = new Schema(
  {
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        email: true,
        lowercase: true,
    },
    amount: {
      type: String,
      trim: true,
      required: true,
    
    },
    reference: {
      type: String,
      required: true,
     
    },

  },
  {
    timestamps: true,
  },
);