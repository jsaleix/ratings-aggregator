import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService, PrismaService],
})
export class SummaryModule {}
