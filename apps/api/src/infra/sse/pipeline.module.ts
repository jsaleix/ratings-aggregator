import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { RequestsService } from 'src/modules/requests/services/requests.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { SSEController } from './sse.controller';
import { MovieJobPipelineService } from 'src/modules/pipelines/services/movie-job-pipeline.service';
import { RequestsQuotaService } from 'src/modules/requests/services/requests-quota.service';
import { AppConfigService } from 'src/modules/app-config/app-config.service';

@Module({
  controllers: [SSEController],
  providers: [
    PrismaService,
    AppConfigService,
    MovieJobPipelineService,
    RequestsQuotaService,
    RequestsService,
    BullmqService,
  ],
})
export class SSEModule {}
