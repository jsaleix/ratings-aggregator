import { Module } from '@nestjs/common';
import { CompareService } from './compare.service';
import { CompareController } from './compare.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MoviesService } from 'src/movies/services/movies.service';
import { RatingsService } from 'src/ratings/ratings.service';
import { SummaryService } from 'src/summary/summary.service';

@Module({
  controllers: [CompareController],
  providers: [
    CompareService,
    PrismaService,
    MoviesService,
    RatingsService,
    SummaryService,
  ],
})
export class CompareModule {}
