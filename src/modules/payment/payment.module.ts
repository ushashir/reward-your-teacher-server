import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaystackModule } from 'paystack-nestjs';

@Module({
  imports: [
    PaystackModule.forRoot(PaystackModule, {
      secretKey: 'sk_live_cbde71e7b4a527e6de2d259d9cb877a820e2d7a9'
    }),
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
