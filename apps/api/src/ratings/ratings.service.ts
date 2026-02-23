import { Injectable } from '@nestjs/common';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { movieRatingSelect, MovieRatingType } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MovieRatingType[]> {
    const res = await this.prisma.movie_Rating.findMany({
      select: movieRatingSelect,
    });
    if (!res) {
      throw new Error('Failed to fetch ratings');
    }
    return res;
  }

  async findOne(id: string): Promise<MovieRatingType> {
    const res = await this.prisma.movie_Rating.findUnique({
      where: { id },
      select: movieRatingSelect,
    });
    if (!res) {
      throw new Error('Failed to fetch rating');
    }
    return res;
  }

  async update(
    id: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<MovieRatingType> {
    const res = await this.prisma.movie_Rating.update({
      where: { id },
      data: updateRatingDto,
      select: movieRatingSelect,
    });
    if (!res) {
      throw new Error('Failed to update rating');
    }
    return res;
  }

  async remove(id: string): Promise<MovieRatingType> {
    const res = await this.prisma.movie_Rating.delete({
      where: { id },
      select: movieRatingSelect,
    });
    if (!res) {
      throw new Error('Failed to remove rating');
    }
    return res;
  }

  async findForMovie(movieId: string): Promise<MovieRatingType[]> {
    const res = await this.prisma.movie_Rating.findMany({
      where: { movieId },
      orderBy: {
        Rating_Source: {
          name: 'asc',
        },
      },
      select: movieRatingSelect,
    });
    if (!res) {
      throw new Error('Failed to fetch ratings for movie');
    }
    return res;
  }
}
