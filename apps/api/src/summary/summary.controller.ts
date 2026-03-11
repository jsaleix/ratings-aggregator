import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SummaryService } from './summary.service';

@ApiTags('Summary')
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('/movie/:slug')
  findOneForMovie(@Param('slug') slug: string) {
    return this.summaryService.findOneByMovieSlug(slug);
  }
}
