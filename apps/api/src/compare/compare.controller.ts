import { Controller, Get, Query } from '@nestjs/common';
import { CompareService } from './compare.service';
import { CompareMoviesQueryDto } from './dto/query';

@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get('/movies')
  async compareMovies(@Query() { movieA, movieB }: CompareMoviesQueryDto) {
    return await this.compareService.compareMovies(movieA, movieB);
  }
}
