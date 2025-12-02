import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('SummaryService', () => {
  let service: SummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummaryService, PrismaService],
    }).compile();

    service = module.get<SummaryService>(SummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
