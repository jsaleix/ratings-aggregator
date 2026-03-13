import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { movieJobPipelineSelect } from '../types/pipeline.entity';

@Injectable()
export class MovieJobPipelineService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRunning() {
    return await this.prisma.movie_Job_Pipeline.findMany({
      select: movieJobPipelineSelect,
      where: {
        status: {
          notIn: ['COMPLETE', 'FAILED'],
        },
      },
    });
  }

  async getSpecific(slug: string) {
    return await this.prisma.movie_Job_Pipeline.findFirst({
      select: movieJobPipelineSelect,
      where: {
        movie: {
          slug,
        },
        status: {
          notIn: ['COMPLETE', 'FAILED'],
        },
      },
    });
  }

  async getByTmdbId(tmdb_id: number) {
    return await this.prisma.movie_Job_Pipeline.findUnique({
      where: {
        tmdb_id,
      },
    });
  }
}
