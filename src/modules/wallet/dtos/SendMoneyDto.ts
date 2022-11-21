import { IsMongoId } from 'class-validator';
import { WithdrawDto } from './WithdrawDto';

export class SendMoneyDto extends WithdrawDto {
  @IsMongoId()
  destination: string;
}
