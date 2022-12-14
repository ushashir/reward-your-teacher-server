import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeanUser } from '../user/user.interface';
import { GetPaymentsDto } from './dtos/GetPaymentsDto';
import { InitializePaymentDto } from './dtos/InitializePaymentDto';
import { VerifyPaymentDto } from './dtos/VerifyPaymentDto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/initialize')
  initializePayment(
    @GetUser() user,
    @Body() initializePaymentDto: InitializePaymentDto,
  ) {
    return this.paymentService.initializePayment(user, initializePaymentDto);
  }

  // TODO: we also need a webhook just in case
  @UseGuards(JwtAuthGuard)
  @Post('/verify')
  verifyPayment(@GetUser() user, @Body() verifyPaymentDto: VerifyPaymentDto) {
    return this.paymentService.verifyPayment(user, verifyPaymentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('successful')
  async getPayments(@GetUser() user: LeanUser, @Query() query: GetPaymentsDto) {
    return this.paymentService.getPayments(user, query);
  }
}
