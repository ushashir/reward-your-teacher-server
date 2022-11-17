import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSchemas } from 'src/common/constants';
import { RewardSchema } from './schemas/reward.schema';
import { MailModule } from '../mail/mail.module';
// import { SchoolSchema } from './schemas/school.schema';
// import { TeacherSchema } from './schemas/teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbSchemas.reward, schema: RewardSchema },

      // { name: DbSchemas.teacher, schema: TeacherSchema },
    ]),
    MailModule,
  ],
  providers: [RewardService],
  controllers: [RewardController],
  // exports: [RewardService],
})
export class RewardModule {}
