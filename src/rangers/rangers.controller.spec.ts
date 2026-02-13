import { Test, TestingModule } from '@nestjs/testing';
import { RangersController } from './rangers.controller';
import { RangersService } from './rangers.service';

describe('RangersController', () => {
  let controller: RangersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RangersController],
      providers: [RangersService],
    }).compile();

    controller = module.get<RangersController>(RangersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
