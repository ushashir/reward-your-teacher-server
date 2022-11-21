import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ErrorMessages } from '../../../common/constants';

export class WithdrawDto {
  @Transform(({ value }) => {
    const valueAsNumber = +value;

    if (valueAsNumber <= 0) {
      throw new BadRequestException(ErrorMessages.INVALID_WITHDRAWAL_AMOUNT);
    }

    return valueAsNumber;
  })
  @IsNumber()
  amount: number;
}
