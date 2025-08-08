import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { DynamicConfigService } from 'src/dynamic-config/dynamic-config.service';

@Module({
  controllers: [RequestsController],
  providers: [
    RequestsService,
    PrismaService,
    BullmqService,
    DynamicConfigService,
  ],
})
export class RequestsModule {}
