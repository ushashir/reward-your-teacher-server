import { Module } from '@nestjs/common';
import { StudentSchema } from './schemas/student.schema';
import { DbSchemas } from 'src/common/constants';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbSchemas.student, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
