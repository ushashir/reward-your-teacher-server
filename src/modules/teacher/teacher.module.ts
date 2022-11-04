import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSchemas } from 'src/common/constants';
import { TeacherSchema } from './schemas/teacher.schema';
import { TeacherController as TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbSchemas.teacher, schema: TeacherSchema }]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
