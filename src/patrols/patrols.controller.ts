import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatrolsService } from './patrols.service';
import { CreatePatrolLogDto } from './dto/create-patrol-log.dto';

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
  async updateActive(@Param('id') id: string, @Body() body: any) {
    if (body.type) {
      return this.patrolsService.updateActive(+id, body.type);
    }
    return this.patrolsService.updateActive(+id, body);
  }

  // --- NEW DELETE ENDPOINT ---
  @Delete('logs/:id')
  removeLog(@Param('id') id: string) {
    return this.patrolsService.removeLog(+id);
  }
}