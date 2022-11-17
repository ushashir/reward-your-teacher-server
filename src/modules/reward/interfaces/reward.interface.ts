import { Document, ObjectId } from 'mongoose';

export interface RewardDocument extends Document {
  userId: string;
  receiverId: string;
  amount: number;
  email: string;
}

export interface SchoolDocument extends Document {
  userId: string;
  nameOfSchool: string;
  teachers: Array<ObjectId>;
}

export interface TeacherDocument extends Document {
  schoolId: string;
  teacherId: string;
  schoolName: string;
  teacherName: string;
  position: string;
  periodOfTeaching: string;
}
