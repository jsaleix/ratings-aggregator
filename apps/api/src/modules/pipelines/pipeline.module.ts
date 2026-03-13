import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MovieJobPipelineService } from './services/movie-job-pipeline.service';

@Module({
  controllers: [],
  providers: [PrismaService, MovieJobPipelineService],
})
export class PipelineModule {}
