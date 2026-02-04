import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranger } from './entities/ranger.entity';
import { CreateRangerDto } from './dto/create-ranger.dto';

@Injectable()
export class RangersService {
  constructor(
    @InjectRepository(Ranger)
    private readonly rangerRepository: Repository<Ranger>,
  ) {}

  // This inserts a new row into your 'rangers' table
  async create(createRangerDto: CreateRangerDto) {
    const newRanger = this.rangerRepository.create(createRangerDto);
    return await this.rangerRepository.save(newRanger);
  }

  // This runs: SELECT * FROM rangers;
  async findAll() {
    return await this.rangerRepository.find();
  }

  // FIX: Added to resolve TS2339 error for 'findOne'
  async findOne(id: number) {
    const ranger = await this.rangerRepository.findOne({ where: { id } });
    if (!ranger) {
      throw new NotFoundException(`Ranger with ID ${id} not found`);
    }
    return ranger;
  }

async login(phoneNo: string, password: string) {
  // Use 'phoneNo' to match your PostgreSQL entity exactly
  const ranger = await this.rangerRepository.findOne({ where: { phoneNo } });

  if (ranger && ranger.password === password) {
    return ranger; // This object contains 'id' and 'username'
  }
  
  throw new UnauthorizedException('Invalid credentials');
}
}