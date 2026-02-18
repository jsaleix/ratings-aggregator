import { Injectable } from '@nestjs/common';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const res = await this.prisma.movie_Rating.findMany();
    if (!res) {
      throw new Error('Failed to fetch ratings');
    }
    return res;
  }

  async findOne(id: string) {
    const res = await this.prisma.movie_Rating.findUnique({
      where: { id },
    });
    if (!res) {
      throw new Error('Failed to fetch rating');
    }
    return res;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const res = await this.prisma.movie_Rating.update({
      where: { id },
      data: updateRatingDto,
    });
    if (!res) {
      throw new Error('Failed to update rating');
    }
    return res;
  }

  async remove(id: string) {
    const res = await this.prisma.movie_Rating.delete({
      where: { id },
    });
    if (!res) {
      throw new Error('Failed to remove rating');
    }
    return res;
  }

  async findForMovie(movieId: string) {
    const res = await this.prisma.movie_Rating.findMany({
      where: { movieId },
      orderBy: { rating_source: 'asc' },
    });
    if (!res) {
      throw new Error('Failed to fetch ratings for movie');
    }
    return res;
  }
}
