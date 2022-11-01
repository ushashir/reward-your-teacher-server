import { LeanDocument } from 'mongoose';

export interface StudentDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export type LeanUser = LeanDocument<StudentDocument>;
