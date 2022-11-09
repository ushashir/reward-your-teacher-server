import { Controller, Get, Post, Request, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
    withdraw(@Request() req: any, @GetUser() user){
        return this.walletService.withdraw(req.body.amount, user.id)
    }
}
