import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { SearchMovieQueryDto } from '../dto/search-movie-query.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.prisma.movie.create({
      data: createMovieDto,
    });
    return movie;
  }

  async findAll() {
    const skip = 0;
    const take = 20;
    const movies = await this.prisma.movie.findMany({
      skip,
      take,
      orderBy: {
        created_at: 'desc',
      },
    });
    return movies;
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    return { movie };
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: string) {
    const movie = await this.prisma.movie.delete({ where: { id } });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    return { message: `Movie with id ${id} deleted successfully` };
  }

  async search(query: SearchMovieQueryDto) {
    const { title, year } = query;
    const where: Prisma.MovieWhereInput = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (year) {
      where.year = year;
    }

    return await this.prisma.movie.findMany({ where });
  }
}
