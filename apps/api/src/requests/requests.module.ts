import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { RequestsAdminController } from './requests-admin.controller';

@Module({
  controllers: [RequestsController, RequestsAdminController],
  providers: [RequestsService, PrismaService, BullmqService],
})
export class RequestsModule {}
