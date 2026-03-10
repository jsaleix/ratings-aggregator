import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MovieJobPipelineService } from '../pipelines/services/movie-job-pipeline.service';
import { PipelineController } from './pipeline.controller';

@Module({
  controllers: [PipelineController],
  providers: [PrismaService, MovieJobPipelineService],
})
export class PipelineModule {}
