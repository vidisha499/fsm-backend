import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatrolLog } from './entities/patrol-log.entity';
import { PatrolActive } from './entities/patrol-active.entity';
import { CreatePatrolLogDto } from './dto/create-patrol-log.dto'; // Fixed typo
import { UpdatePatrolActiveDto } from './dto/update-patrol-active.dto';

@Injectable()
export class PatrolsService {
  constructor(
    @InjectRepository(PatrolLog)
    private readonly logRepo: Repository<PatrolLog>,
    @InjectRepository(PatrolActive)
    private readonly activeRepo: Repository<PatrolActive>,
  ) {}

  // Starts a live session in patrol_active table
  async startActivePatrol(rangerId: number) {
    const active = this.activeRepo.create({ 
      rangerId, 
      isActive: true 
    });
    return await this.activeRepo.save(active);
  }

  // Updates observations (Animals, Water, etc.) to ensure persistence
  async updateActive(id: number, updateDto: UpdatePatrolActiveDto) {
    const record = await this.activeRepo.preload({
      id: id,
      ...updateDto,
    });
    if (!record) throw new NotFoundException(`Active patrol #${id} not found`);
    return await this.activeRepo.save(record);
  }

  async createLog(createLogDto: CreatePatrolLogDto) {
    const log = this.logRepo.create(createLogDto);
    return await this.logRepo.save(log);
  }

  async findAllLogs() {
    return await this.logRepo.find({ relations: ['ranger'] });
  }

  async findActive() {
    return await this.activeRepo.find({ where: { isActive: true }, relations: ['ranger'] });
  }
}