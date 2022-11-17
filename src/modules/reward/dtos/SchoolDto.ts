import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateSchoolDto {
  @IsNotEmpty()
  schoolId: string;

  @IsNotEmpty()
  schoolName: string;

  teachers: Array<ObjectId>;
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
