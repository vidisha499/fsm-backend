import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  async create(createIncidentDto: CreateIncidentDto) {
    const incident = this.incidentRepository.create(createIncidentDto);
    return await this.incidentRepository.save(incident);
  }

  async findAll() {
    return await this.incidentRepository.find({ relations: ['ranger'] });
  }

  // --- ADD THESE TO FIX THE ERRORS ---

  async findOne(id: number) {
    const incident = await this.incidentRepository.findOne({ 
      where: { id }, 
      relations: ['ranger'] 
    });
    if (!incident) throw new NotFoundException(`Incident #${id} not found`);
    return incident;
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto) {
    const incident = await this.incidentRepository.preload({
      id: id,
      ...updateIncidentDto,
    });
    if (!incident) throw new NotFoundException(`Incident #${id} not found`);
    return this.incidentRepository.save(incident);
  }

  async remove(id: number) {
    const incident = await this.findOne(id);
    return this.incidentRepository.remove(incident);
  }

  // src/incidents/incidents.service.ts

async findByRanger(rangerId: number) {
  return await this.incidentRepository.find({
    where: { rangerId: rangerId },
    order: { createdAt: 'DESC' } // Newest incidents first
  });
}
}