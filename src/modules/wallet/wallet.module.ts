import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSchemas } from '../../common/constants';
import { TransferModule } from '../transfer/transfer.module';
import { UserModule } from '../user/user.module';
import { WalletSchema } from './schema/wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbSchemas.wallet, schema: WalletSchema },
    ]),
    TransferModule,
    forwardRef(() => UserModule),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
