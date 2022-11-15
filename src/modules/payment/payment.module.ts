import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSchemas } from '../../common/constants';
import { WalletModule } from '../wallet/wallet.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentSchema } from './schema/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DbSchemas.payment,
        schema: PaymentSchema,
      },
    ]),
    HttpModule,
    WalletModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
