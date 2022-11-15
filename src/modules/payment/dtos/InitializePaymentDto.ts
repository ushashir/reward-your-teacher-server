import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class InitializePaymentDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  amount: number;
}
