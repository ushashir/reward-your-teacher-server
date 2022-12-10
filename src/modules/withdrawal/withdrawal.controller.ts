import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WithdrawDto } from '../wallet/dtos/WithdrawDto';
import { WalletService } from '../wallet/wallet.service';
import { WithdrawalService } from './withdrawal.service';

@Controller('withdrawal')
export class WithdrawalController {

    constructor(private readonly withdrawalService: WithdrawalService,
        private readonly walletService: WalletService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/withdraw')
    withdraw(@Body() { amount }: WithdrawDto, @GetUser() user) {
        return this.withdrawalService.withdraw(amount, user._id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/history')
    withdrawHistory(@GetUser() user) {
        return this.withdrawalService.withdrawHistory(user._id)
    }
}
