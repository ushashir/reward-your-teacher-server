import { Controller, Get, Post, Request, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
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

    @UseGuards(JwtAuthGuard)
    @Post('/deposit')
    sendMoney(@Request() req: any, @GetUser() user){
        return this.walletService.sendMoney(user, req.body.amount, req.body.destination, user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/total-money')
    totalMoneyRecieved(@GetUser() user){
        return this.walletService.getTotalMoneyRecieved(user)
    }
}
