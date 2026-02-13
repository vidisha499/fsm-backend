import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnsiteAttendance } from './entities/onsite-attendance.entity';
import { CreateOnsiteAttendanceDto } from './dto/create-onsite-attendance.dto';
import { UpdateOnsiteAttendanceDto } from './dto/update-onsite-attendance.dto';

@Injectable()
export class OnsiteAttendanceService {
  constructor(
    @InjectRepository(OnsiteAttendance)
    private readonly onsiteRepo: Repository<OnsiteAttendance>,
  ) {}

  async create(createDto: CreateOnsiteAttendanceDto) {
    const record = this.onsiteRepo.create(createDto);
    return await this.onsiteRepo.save(record);
  }

  async findAll() {
    return await this.onsiteRepo.find({ relations: ['rangerDetails'] });
  }

  async findOne(id: number) {
    const record = await this.onsiteRepo.findOne({ 
      where: { id },
      relations: ['rangerDetails'] 
    });
    if (!record) throw new NotFoundException(`Onsite record #${id} not found`);
    return record;
  }

  async update(id: number, updateDto: UpdateOnsiteAttendanceDto) {
    const record = await this.onsiteRepo.preload({
      id: id,
      ...updateDto,
    });
    if (!record) throw new NotFoundException(`Onsite record #${id} not found`);
    return this.onsiteRepo.save(record);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    return this.onsiteRepo.remove(record);
  }
}