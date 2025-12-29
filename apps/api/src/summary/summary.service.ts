import { HttpCode, Injectable, NotImplementedException } from '@nestjs/common';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class SummaryService {
  constructor(
    private prisma: PrismaService,
    private bullmqService: BullmqService,
  ) {}

  async findOneByMovieId(id: string) {
    return await this.prisma.movie_Ratings_Summary.findFirst({
      where: { movieId: id },
    });
  }

  async remove(id: string) {
    const res = await this.prisma.movie_Ratings_Summary.delete({
      where: { id },
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
