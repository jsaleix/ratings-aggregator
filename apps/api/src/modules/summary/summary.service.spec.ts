import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

describe('SummaryService', () => {
  let service: SummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummaryService,
        PrismaService,
        {
          provide: BullmqService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<SummaryService>(SummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
