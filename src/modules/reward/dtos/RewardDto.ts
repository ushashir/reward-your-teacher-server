import { IsNotEmpty } from 'class-validator';

export class CreateRewardDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  receiverId: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  email: string;
}
