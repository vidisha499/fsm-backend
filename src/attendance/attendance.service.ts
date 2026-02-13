

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    this.logger.log(`Recording attendance for ${createAttendanceDto.rangerName}`);
    
    // The entity must have latitude and longitude columns for this to save!
    const newRecord = this.attendanceRepository.create(createAttendanceDto);
    return await this.attendanceRepository.save(newRecord);
  }

  async findAll() {
    return await this.attendanceRepository.find();
  }

  async remove(id: number) {
    return await this.attendanceRepository.delete(id);
  }
}