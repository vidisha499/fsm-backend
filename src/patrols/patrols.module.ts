import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatrolsService } from './patrols.service';
import { PatrolsController } from './patrols.controller';
import { PatrolLog } from './entities/patrol-log.entity';
import { PatrolActive } from './entities/patrol-active.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatrolLog, PatrolActive])],
  controllers: [PatrolsController],
  providers: [PatrolsService],
})
export class PatrolsModule {}