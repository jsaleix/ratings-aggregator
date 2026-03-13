import { Test, TestingModule } from '@nestjs/testing';
import { CompareService } from './compare.service';
import { MoviesService } from 'src/modules/movies/services/movies.service';
import { SummaryService } from 'src/modules/summary/summary.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { RatingsService } from 'src/modules/ratings/ratings.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

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
                {
          provide: BullmqService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<CompareService>(CompareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
