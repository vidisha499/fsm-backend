import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatrolLog } from './entities/patrol-log.entity';
import { PatrolActive } from './entities/patrol-active.entity';

@Injectable()
export class PatrolsService {
  constructor(
    @InjectRepository(PatrolLog) private readonly logRepo: Repository<PatrolLog>,
    @InjectRepository(PatrolActive) private readonly activeRepo: Repository<PatrolActive>,
  ) {}

  async startActivePatrol(rangerId: number) {
    try {
      await this.activeRepo.update({ rangerId, isActive: true }, { isActive: false });
      
      const active = this.activeRepo.create({ 
        rangerId: Number(rangerId), 
        isActive: true,
        startTime: new Date(),
        obsAnimal: 0, 
        obsWater: 0, 
        obsImpact: 0, 
        obsDeath: 0, 
        obsFelling: 0, 
        obsOther: 0
      });
      return await this.activeRepo.save(active);
    } catch (error) {
      throw new Error('Failed to create active session');
    }
  }

  async updateActive(id: number, updateData: any) {
    const record = await this.activeRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException(`Active patrol #${id} not found`);

    if (updateData.type && updateData.details) {
      const columnMap: any = { 
        'Animal': 'obsAnimal', 
        'Water': 'obsWater', 
        'Impact': 'obsImpact', 
        'Death': 'obsDeath', 
        'Felling': 'obsFelling', 
        'Other': 'obsOther' 
      };
      
      const column = columnMap[updateData.type];
      if (column) record[column] += 1;

      try {
        await this.activeRepo.query(
          `INSERT INTO observations (patrol_id, ranger_id, type, details) VALUES ($1, $2, $3, $4)`,
          [id, record.rangerId, updateData.type, JSON.stringify(updateData.details)]
        );
      } catch (dbErr) {
        console.error('Failed to insert into observations table:', dbErr);
      }
    } 
    else if (typeof updateData.type === 'string') {
      const columnMap: any = { 
        'Animal': 'obsAnimal', 'Water': 'obsWater', 'Impact': 'obsImpact', 
        'Death': 'obsDeath', 'Felling': 'obsFelling', 'Other': 'obsOther' 
      };
      const column = columnMap[updateData.type];
      if (column) record[column] += 1;
    } 
    else {
      Object.assign(record, updateData);
    }

    return await this.activeRepo.save(record);
  }

  async createLog(dto: any) {
    try {
      await this.activeRepo.update({ rangerId: dto.rangerId, isActive: true }, { isActive: false });
      
      const log = this.logRepo.create({ 
        rangerId: dto.rangerId,
        patrolName: dto.patrolName,
        startTime: dto.startTime,
        endTime: dto.endTime,
        status: dto.status || 'COMPLETED',
        siteLocation: dto.siteLocation || 'PANNA SITE',
        distanceKm: dto.distanceKm,
        duration: dto.duration,
        observationData: dto.observationData
      });
      
      return await this.logRepo.save(log);
    } catch (error) {
      console.error("Critical Error in createLog:", error);
      throw error;
    }
  }

  async findAllLogs() { 
    return await this.logRepo.find({ 
      order: { startTime: 'DESC' } 
    }); 
  }

  async findActive() { 
    return await this.activeRepo.find({ where: { isActive: true } }); 
  }

  // --- NEW DELETE METHOD ---
  async removeLog(id: number) {
    const result = await this.logRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patrol log with ID ${id} not found`);
    }
    return { message: 'Log deleted successfully' };
  }
}