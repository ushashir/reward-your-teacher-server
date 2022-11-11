import { Body, Controller, Post } from '@nestjs/common';
import { InjectPaystackClient } from 'paystack-nestjs';
import { Paystack } from 'paystack-sdk';

@Controller('paystack')
export class PaymentController {
  constructor(
    @InjectPaystackClient() private readonly paystackClient: Paystack,
  ) {}

  @Post('pay')
  async pay(@Body() body) {
    await this.paystackClient.charge.create({
      email: body.email,
      amount: '24000',
      reference: body.trxref,
    });
  }
}
