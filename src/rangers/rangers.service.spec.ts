import { Test, TestingModule } from '@nestjs/testing';
import { RangersService } from './rangers.service';

describe('RangersService', () => {
  let service: RangersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RangersService],
    }).compile();

    service = module.get<RangersService>(RangersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
