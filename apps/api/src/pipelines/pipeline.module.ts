import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MovieJobPipelineService } from '../pipelines/services/movie-job-pipeline.service';

@Module({
  controllers: [],
  providers: [PrismaService, MovieJobPipelineService],
})
export class PipelineModule {}
