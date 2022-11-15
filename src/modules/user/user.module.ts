import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSchemas } from '../../common/constants';
import { MailModule } from '../mail/mail.module';
import { WalletModule } from '../wallet/wallet.module';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    WalletModule,
    MongooseModule.forFeature([{ name: DbSchemas.user, schema: UserSchema }]),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
