import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DbSchemas } from '../../common/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userModel = () => ({});

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        { 
          provide: getModelToken(DbSchemas.user), 
          useValue: Model  // <-- Use the Model Class from Mongoose
        }
      ]
    }).compile();

    controller = await module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
