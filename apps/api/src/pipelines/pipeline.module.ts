import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MovieJobPipelineService } from '../pipelines/services/movie-job-pipeline.service';
import { PipelineController } from './pipeline.controller';
import { RequestsService } from 'src/requests/services/requests.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

@Module({
  controllers: [PipelineController],
  providers: [
    PrismaService,
    MovieJobPipelineService,
    RequestsService,
    BullmqService,
  ],
})
export class PipelineModule {}
