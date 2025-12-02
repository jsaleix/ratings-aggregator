import { Test, TestingModule } from '@nestjs/testing';
import { CompareService } from './compare.service';
import { MoviesService } from 'src/movies/services/movies.service';
import { SummaryService } from 'src/summary/summary.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { RatingsService } from 'src/ratings/ratings.service';

describe('CompareService', () => {
  let service: CompareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompareService,
        MoviesService,
        RatingsService,
        SummaryService,
        PrismaService,
      ],
    }).compile();

    service = module.get<CompareService>(CompareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
