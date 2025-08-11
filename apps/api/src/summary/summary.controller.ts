import { Controller, Get, Param } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('/movie/:id')
  findOne(@Param('id') id: string) {
    return this.summaryService.findOneByMovieId(id);
  }
}
