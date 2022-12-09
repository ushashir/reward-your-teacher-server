import { forwardRef, Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSchemas } from 'src/common/constants';
import { WithdrawalSchema } from './schemas/withdrawal.schema';
import { WithdrawalController } from './withdrawal.controller';
import { UserModule } from '../user/user.module';
// import { WalletSchema } from '../wallet/schema/wallet.schema';
import { TransferModule } from '../transfer/transfer.module';
import { WalletModule } from '../wallet/wallet.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbSchemas.withdrawal, schema: WithdrawalSchema },
      // { name: DbSchemas.wallet, schema: WalletSchema },
    ]),
    TransferModule,
    WalletModule,
    forwardRef(() => UserModule),
  ],
  providers: [WithdrawalService],
  controllers: [WithdrawalController],
  exports: [WithdrawalService],
})
export class WithdrawalModule { }
