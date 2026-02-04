import { Test, TestingModule } from '@nestjs/testing';
import { OnsiteAttendanceService } from './onsite-attendance.service';

describe('OnsiteAttendanceService', () => {
  let service: OnsiteAttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnsiteAttendanceService],
    }).compile();

    service = module.get<OnsiteAttendanceService>(OnsiteAttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
