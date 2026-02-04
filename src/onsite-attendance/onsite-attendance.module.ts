import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnsiteAttendanceService } from './onsite-attendance.service';
import { OnsiteAttendanceController } from './onsite-attendance.controller';
import { OnsiteAttendance } from './entities/onsite-attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OnsiteAttendance])],
  controllers: [OnsiteAttendanceController],
  providers: [OnsiteAttendanceService],
})
export class OnsiteAttendanceModule {}