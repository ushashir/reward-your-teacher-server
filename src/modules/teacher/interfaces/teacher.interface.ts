import { LeanDocument } from 'mongoose';

export interface TeacherDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export type LeanTeacher = LeanDocument<TeacherDocument>;
