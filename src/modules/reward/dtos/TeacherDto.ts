import { IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  schoolId: string;

  @IsNotEmpty()
  teacherId: string;

  @IsNotEmpty()
  schoolName: string;

  @IsNotEmpty()
  teacherName: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  periodOfTeaching: string;
}

// export class CreateRewardDto {
//   @IsNotEmpty()
//   userId: string;

//   @IsNotEmpty()
//   receiverId: string;

//   @IsNotEmpty()
//   amount: number;

//   @IsNotEmpty()
//   email: string;
// }
