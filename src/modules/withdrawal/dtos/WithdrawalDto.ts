import { IsNotEmpty } from 'class-validator';

export class CreateWithdrawalDto {
  @IsNotEmpty()
  userId: string;

  // @IsNotEmpty()
  // receiverId: string;

  @IsNotEmpty()
  amount: number;

  // @IsNotEmpty()
  // email: string;
}
