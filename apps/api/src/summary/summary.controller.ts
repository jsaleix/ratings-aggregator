import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { SummaryService } from './summary.service';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('/movie/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.summaryService.findOneByMovieId(id);
  }

  @Role('admin')
  @Post('/movie/:id/refresh')
  refresh(@Param('id', ParseUUIDPipe) id: string) {
    return this.summaryService.refresh(id);
  }

  @Role('admin')
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.summaryService.remove(id);
  }
}
