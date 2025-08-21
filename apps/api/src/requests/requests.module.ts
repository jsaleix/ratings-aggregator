import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

@Module({
  controllers: [RequestsController],
  providers: [
    RequestsService,
    PrismaService,
    BullmqService,
  ],
})
export class RequestsModule {}
