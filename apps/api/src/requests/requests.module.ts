import { Module } from '@nestjs/common';

import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { RequestsService } from './services/requests.service';
import { RequestsQuotaService } from './services/requests-quota.service';
import { RequestsController } from './controllers/requests.controller';
import { RequestsAdminController } from './controllers/requests-admin.controller';

@Module({
  controllers: [RequestsController, RequestsAdminController],
  providers: [
    RequestsService,
    PrismaService,
    BullmqService,
    RequestsQuotaService,
  ],
})
export class RequestsModule {}
