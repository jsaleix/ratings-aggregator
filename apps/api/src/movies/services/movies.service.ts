import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { SearchMovieQueryDto } from '../dto/search-movie-query.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { PaginatedResult } from 'src/shared/types/pagination';
import { MovieType } from '../entities/movie.entity';
import { FindMoviesDTO } from '../dto/find-movies.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.prisma.movie.create({
      data: createMovieDto,
    });
    return movie;
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException(`movie ${id} not found`);
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

  async getRandomMovies() {
    const moviesCount = await this.prisma.movie.count();
    const skip =
      moviesCount > 10 ? Math.floor(Math.random() * (moviesCount - 10)) : 0;
    const movies = await this.prisma.movie.findMany({
      skip,
      take: 15,
    });
    return movies;
  }

  async findAll(
    findMoviesDTO: FindMoviesDTO,
  ): Promise<PaginatedResult<MovieType>> {
    let { order, orderBy, page } = findMoviesDTO;
    if (!orderBy) orderBy = 'release_date';
    if (!order) order = 'desc';
    if (!page) page = 1;

    const paginate: PaginateFunction = paginator({ perPage: 15 });

    return await paginate(
      this.prisma.movie,
      {
        orderBy: {
          [orderBy]: order,
        },
      },
      {
        page,
      },
    );
  }

  async search(query: SearchMovieQueryDto) {
    let { title, year, order, orderBy, page } = query;
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

    if (!orderBy) orderBy = 'id';
    if (!order) order = 'desc';
    if (!page) page = 1;

    const paginate: PaginateFunction = paginator({ perPage: 15 });

    return await paginate(
      this.prisma.movie,
      {
        orderBy: {
          [orderBy]: order,
        },
        where,
      },
      {
        page,
      },
    );
    // return await this.prisma.movie.findMany({ where });
  }
}
