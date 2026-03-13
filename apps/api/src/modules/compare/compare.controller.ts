import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CompareService } from './compare.service';

@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get('/movies/:id')
  async getFullMovie(@Param('id', ParseUUIDPipe) id: string) {
    return await this.compareService.getFullMovie(id);
  }
}
