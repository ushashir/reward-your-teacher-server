import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendMoneyDto } from './dtos/SendMoneyDto';
import { WithdrawDto } from './dtos/WithdrawDto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getWallet(@GetUser() user) {
    console.log('user => ', user);
    return this.walletService.getWallet(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw')
  withdraw(@Body() { amount }: WithdrawDto, @GetUser() user) {
    return this.walletService.withdraw(amount, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send')
  sendMoney(@Body() { amount, destination }: SendMoneyDto, @GetUser() user) {
    return this.walletService.sendMoney(user, amount, destination);
  }
}
