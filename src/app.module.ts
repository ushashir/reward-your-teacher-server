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
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    MongoDbProviderModule,
    TeacherModule,
    CronModule,
    AuthModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
