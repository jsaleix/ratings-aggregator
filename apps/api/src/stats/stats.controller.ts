import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatsService } from './stats.service';
import { UpdateStatDto } from './dto/update-stat.dto';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('stats')
@Role('admin')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("/full")
  findAll() {
    return this.statsService.getAll();
  }
}
