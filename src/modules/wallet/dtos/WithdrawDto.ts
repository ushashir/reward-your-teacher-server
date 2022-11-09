import { IsNotEmpty, IsNumber } from 'class-validator'

export class WithdrawalDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number
}