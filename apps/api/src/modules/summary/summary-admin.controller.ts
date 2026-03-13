import { Controller, Delete, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SummaryService } from './summary.service';
import { Role } from 'src/modules/auth/decorators/role.decorator';

@ApiTags('Summary Admin')
@Role('admin')
@Controller('summary/admin')
export class SummaryAdminController {
  constructor(private readonly summaryService: SummaryService) {}

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
