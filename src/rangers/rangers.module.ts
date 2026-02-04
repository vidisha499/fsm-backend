import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Import this
import { RangersService } from './rangers.service';
import { RangersController } from './rangers.controller';
import { Ranger } from './entities/ranger.entity'; // 2. Import your Entity

@Module({
  // 3. This line tells Nest to provide the "RangerRepository" here
  imports: [TypeOrmModule.forFeature([Ranger])], 
  controllers: [RangersController],
  providers: [RangersService],
})
export class RangersModule {}