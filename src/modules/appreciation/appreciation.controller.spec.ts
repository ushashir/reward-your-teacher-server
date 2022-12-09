import { Test, TestingModule } from '@nestjs/testing';
import { AppreciationController } from './appreciation.controller';

describe('AppreciationController', () => {
  let controller: AppreciationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppreciationController],
    }).compile();

    controller = module.get<AppreciationController>(AppreciationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
