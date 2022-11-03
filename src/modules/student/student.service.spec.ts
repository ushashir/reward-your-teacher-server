import { Test, TestingModule } from '@nestjs/testing';
import { DbSchemas } from '../../common/constants';
import { StudentService } from './student.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService,
        { 
          provide: getModelToken(DbSchemas.student), 
          useValue: Model  // <-- Use the Model Class from Mongoose
        }
      ],
    }).compile();

    service = await module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
