import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DbSchemas } from '../../common/constants';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

const userModel = () => ({});

describe('UserController', () => {
  let controller: TeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [TeacherService,
        { 
          provide: getModelToken(DbSchemas.teacher), 
          useValue: Model  // <-- Use the Model Class from Mongoose
        }
      ]
    }).compile();

    controller = await module.get<TeacherController>(TeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
