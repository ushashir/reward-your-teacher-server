import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DbSchemas } from '../../common/constants';
import { StudentDocument } from './interfaces/student.interface';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';


describe('StudentController', () => {
  let controller: StudentController;
  let studentModel: Model<StudentDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService,
        { 
          provide: getModelToken(DbSchemas.student), 
          useValue: Model  // <-- Use the Model Class from Mongoose
        }
      ]
    }).compile();

    controller = await module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
