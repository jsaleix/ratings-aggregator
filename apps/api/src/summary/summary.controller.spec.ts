import { Test, TestingModule } from '@nestjs/testing';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

describe('SummaryController', () => {
  let controller: SummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryController],
      providers: [
        SummaryService,
        PrismaService,
        {
          provide: BullmqService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<SummaryController>(SummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
