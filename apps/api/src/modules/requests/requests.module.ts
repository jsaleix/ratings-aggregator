import { Module } from '@nestjs/common';

import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { RequestsService } from './services/requests.service';
import { RequestsQuotaService } from './services/requests-quota.service';
import { RequestsController } from './controllers/requests.controller';
import { RequestsAdminController } from './controllers/requests-admin.controller';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { MovieJobPipelineService } from 'src/modules/pipelines/services/movie-job-pipeline.service';

@Module({
  controllers: [RequestsController, RequestsAdminController],
  providers: [
    AppConfigService,
    RequestsService,
    PrismaService,
    BullmqService,
    RequestsQuotaService,
    MovieJobPipelineService,
  ],
})
export class RequestsModule {}
