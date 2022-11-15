import { Document } from 'mongoose';
import { PaymentStatusEnum } from '../../../common/enums';

export interface PaymentDocument extends Document {
  userId: string;
  amount: number;
  reference: string;
  currency: string;
  status: PaymentStatusEnum;
}

export interface PaystackSuccess {
  status: boolean;
  message: string;
  data: PaymentData;
}

export interface PaymentData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: Metadata;
  log: Log;
  fees: number;
  fees_split: null;
  authorization: Authorization;
  customer: Customer;
  plan: null;
  split: Record<string, unknown>;
  order_id: null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: null;
  source: null;
  fees_breakdown: null;
  transaction_date: string;
  plan_object: Record<string, unknown>;
  subaccount: Record<string, unknown>;
}

export interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name: null;
  receiver_bank_account_number: null;
  receiver_bank: null;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: null;
  risk_action: string;
  international_format_phone: null;
}

export interface Log {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: any[];
  history: History[];
}

export interface History {
  type: string;
  message: string;
  time: number;
}

export interface Metadata {
  referrer: string;
}
