import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { getModelToken } from '@nestjs/mongoose';
import { DbSchemas } from '../../common/constants';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherService,
        { provide: getModelToken(DbSchemas.teacher), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
