import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/balance')
  getWalletBalance(@GetUser() user) {
    return this.walletService.getWalletBalance(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw')
  withdraw(@Request() req: any, @GetUser() user) {
    // TODO: please use a dto for this controller and do your validations there

    return this.walletService.withdraw(req.body.amount, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/deposit')
  sendMoney(@Request() req: any, @GetUser() user) {
    return this.walletService.sendMoney(
      user,
      req.body.amount,
      req.body.destination,
      user._id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/total-money')
  totalMoneyReceived(@GetUser() user) {
    return this.walletService.getTotalMoneyReceived(user);
  }
}
