import { Controller, Get, Post, Request, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WithdrawalDto } from './dtos/WithdrawDto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/balance')
    getWalletBalance( @GetUser() user ){
        return this.walletService.getWalletBalance(user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/withdraw')
    // withdraw(@Body() withdrawalDto: WithdrawalDto){
    withdraw(@Request() req: any, @GetUser() user){
        return this.walletService.withdraw(req.body.amount, user.id)
    }
}
