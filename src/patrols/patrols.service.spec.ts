import { Test, TestingModule } from '@nestjs/testing';
import { PatrolsService } from './patrols.service';

describe('PatrolsService', () => {
  let service: PatrolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatrolsService],
    }).compile();

    service = module.get<PatrolsService>(PatrolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
