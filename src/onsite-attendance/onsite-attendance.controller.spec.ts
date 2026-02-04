import { Test, TestingModule } from '@nestjs/testing';
import { OnsiteAttendanceController } from './onsite-attendance.controller';
import { OnsiteAttendanceService } from './onsite-attendance.service';

describe('OnsiteAttendanceController', () => {
  let controller: OnsiteAttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnsiteAttendanceController],
      providers: [OnsiteAttendanceService],
    }).compile();

    controller = module.get<OnsiteAttendanceController>(OnsiteAttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
