import { Injectable } from '@nestjs/common';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import {
  movieRatingsSummarySelect,
  MovieRatingsSummaryType,
} from './entities/summary.entity';

@Injectable()
export class SummaryService {
  constructor(
    private prisma: PrismaService,
    private bullmqService: BullmqService,
  ) {}

  async findOneByMovieId(id: string): Promise<MovieRatingsSummaryType | null> {
    return await this.prisma.movie_Ratings_Summary.findFirst({
      where: { movieId: id },
      select: movieRatingsSummarySelect,
    });
  }

  async remove(id: string): Promise<MovieRatingsSummaryType> {
    const res = await this.prisma.movie_Ratings_Summary.delete({
      where: { id },
      select: movieRatingsSummarySelect,
    });
    if (!res) {
      throw new Error('Failed to remove summary');
    }
    return res;
  }

  async refresh(movieId: string) {
    this.bullmqService.generateSummary(movieId);
    return { success: true };
  }
}
