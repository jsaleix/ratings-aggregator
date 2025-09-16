import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CompareService } from './compare.service';
import { CompareMoviesQueryDto } from './dto/query';

@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get('/movies')
  async compareMovies(@Query() { movieA, movieB }: CompareMoviesQueryDto) {
    return await this.compareService.compareMovies(movieA, movieB);
  }

  @Get('/movies/:id')
  async getFullMovie(@Param('id', ParseUUIDPipe) id: string) {
    return await this.compareService.getFullMovie(id);
  }
}
