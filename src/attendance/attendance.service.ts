import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return await this.attendanceRepository.save(attendance);
  }

  async findAll() {
    return await this.attendanceRepository.find({ relations: ['rangerDetails'] });
  }

  async findOne(id: number) {
    const record = await this.attendanceRepository.findOne({ 
      where: { id },
      relations: ['rangerDetails'] 
    });
    if (!record) throw new NotFoundException(`Attendance record #${id} not found`);
    return record;
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const record = await this.attendanceRepository.preload({
      id: id,
      ...updateAttendanceDto,
    });
    if (!record) throw new NotFoundException(`Attendance record #${id} not found`);
    return this.attendanceRepository.save(record);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    return this.attendanceRepository.remove(record);
  }
}