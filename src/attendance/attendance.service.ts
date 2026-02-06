import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    // TypeORM handles the timestamp automatically via @CreateDateColumn
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