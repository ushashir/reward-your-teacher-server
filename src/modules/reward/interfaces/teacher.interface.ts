import { Document } from 'mongoose';

export interface TeacherDocument extends Document {
  schoolId: string;
  teacherId: string;
  schoolName: string;
  teacherName: string;
  position: string;
  periodOfTeaching: string;
}
