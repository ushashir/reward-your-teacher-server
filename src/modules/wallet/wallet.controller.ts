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
  getWalletBalance(@GetUser() user) {
    return this.walletService.getWallet(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw')
  withdraw(@Body() { amount }: WithdrawDto, @GetUser() user) {
    // TODO: please use a dto for this controller and do your validations there

    return this.walletService.withdraw(amount, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send')
  sendMoney(@Body() { amount, destination }: SendMoneyDto, @GetUser() user) {
    return this.walletService.sendMoney(user, amount, destination);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/total-money')
  totalMoneyReceived(@GetUser() user) {
    return this.walletService.getTotalMoneyReceived(user);
  }
}
