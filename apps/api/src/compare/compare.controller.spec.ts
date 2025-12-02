import { Test, TestingModule } from '@nestjs/testing';
import { CompareController } from './compare.controller';
import { CompareService } from './compare.service';
import { MoviesService } from 'src/movies/services/movies.service';
import { RatingsService } from 'src/ratings/ratings.service';
import { SummaryService } from 'src/summary/summary.service';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('CompareController', () => {
  let controller: CompareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompareController],
      providers: [
        CompareService,
        PrismaService,
        MoviesService,
        RatingsService,
        SummaryService,
      ],
    }).compile();

    controller = module.get<CompareController>(CompareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
