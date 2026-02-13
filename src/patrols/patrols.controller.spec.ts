import { Test, TestingModule } from '@nestjs/testing';
import { PatrolsController } from './patrols.controller';
import { PatrolsService } from './patrols.service';

describe('PatrolsController', () => {
  let controller: PatrolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatrolsController],
      providers: [PatrolsService],
    }).compile();

    controller = module.get<PatrolsController>(PatrolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
