import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PatrolsService } from './patrols.service';
import { CreatePatrolLogDto } from './dto/create-patrol-log.dto';
import { UpdatePatrolActiveDto } from './dto/update-patrol-active.dto';

@Controller('patrols')
export class PatrolsController {
  constructor(private readonly patrolsService: PatrolsService) {}

  @Post('active')
  startActivePatrol(@Body('rangerId') rangerId: number) {
    return this.patrolsService.startActivePatrol(rangerId);
  }

  @Post('logs')
  createLog(@Body() createLogDto: CreatePatrolLogDto) {
    return this.patrolsService.createLog(createLogDto);
  }

  @Get('logs')
  findAllLogs() {
    return this.patrolsService.findAllLogs();
  }

  @Get('active')
  findActive() {
    return this.patrolsService.findActive();
  }

  @Patch('active/:id')
  updateActive(@Param('id') id: string, @Body() updateDto: UpdatePatrolActiveDto) {
    return this.patrolsService.updateActive(+id, updateDto);
  }
}