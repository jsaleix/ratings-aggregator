import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class SummaryService {
  constructor(private prismaService: PrismaService) {}

  async findOneByMovieId(id: string) {
    return await this.prismaService.movie_Ratings_Summary.findFirst({
      where: { movieId: id },
    });
  }
}
