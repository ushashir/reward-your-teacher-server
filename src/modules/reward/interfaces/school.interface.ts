import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface SchoolDocument extends Document {
  userId: string;
  nameOfSchool: string;
  teachers: Array<ObjectId>;
}
