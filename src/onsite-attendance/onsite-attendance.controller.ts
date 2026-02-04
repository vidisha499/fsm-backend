import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnsiteAttendanceService } from './onsite-attendance.service';
import { CreateOnsiteAttendanceDto } from './dto/create-onsite-attendance.dto';
import { UpdateOnsiteAttendanceDto } from './dto/update-onsite-attendance.dto';

@Controller('onsite-attendance')
export class OnsiteAttendanceController {
  constructor(private readonly onsiteAttendanceService: OnsiteAttendanceService) {}

  @Post()
  create(@Body() createOnsiteAttendanceDto: CreateOnsiteAttendanceDto) {
    return this.onsiteAttendanceService.create(createOnsiteAttendanceDto);
  }

  @Get()
  findAll() {
    return this.onsiteAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onsiteAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnsiteAttendanceDto: UpdateOnsiteAttendanceDto) {
    return this.onsiteAttendanceService.update(+id, updateOnsiteAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onsiteAttendanceService.remove(+id);
  }
}
