import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService, PrismaService, BullmqService],
})
export class SummaryModule {}
