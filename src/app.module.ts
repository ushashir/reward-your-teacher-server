import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/exceptions/';
import { MongoDbProviderModule } from './common/providers/database/mongo/mongodb.module';
import { CronModule } from './common/services/cron/cron.module';
import { validateEnv } from './common/validations';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
// import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './modules/auth/services/auth.service';
import { WalletModule } from './modules/wallet/wallet.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    MongoDbProviderModule,
    CronModule,
    AuthModule,
    UserModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
