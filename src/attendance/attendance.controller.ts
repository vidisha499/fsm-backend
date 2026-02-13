import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Matches POST: http://localhost:3000/api/attendance/beat-attendance
  @Post('beat-attendance')
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Delete(':id')
remove(@Param('id') id: string) {
  // Add the '+' sign here to convert string to number
  return this.attendanceService.remove(+id);
}
}