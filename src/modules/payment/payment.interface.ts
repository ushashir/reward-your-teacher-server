import { LeanDocument } from 'mongoose';


export interface PaymentDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;

}

export type LeanPayment = LeanDocument<PaymentDocument>;