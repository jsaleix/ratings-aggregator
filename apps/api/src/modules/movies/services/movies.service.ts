import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchMovieQueryDto } from '../dto/search-movie-query.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { PaginatedResult } from 'src/shared/types/pagination';
import { movieSelect, MovieType } from '../entities/movie.entity';
import { FindMoviesDTO } from '../dto/find-movies.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination';
import { AdminFindMoviesDTO } from '../dto/admin/find-movies.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string): Promise<{ movie: MovieType }> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      select: movieSelect,
    });
    if (!movie) throw new NotFoundException(`movie ${id} not found`);
    return { movie };
  }

  async findOneBySlug(slug: string): Promise<{ movie: MovieType }> {
    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      select: movieSelect,
    });
    if (!movie) throw new NotFoundException(`movie ${slug} not found`);
    return { movie };
  }

  async remove(id: string) {
    const { movie } = await this.findOneById(id);
    const deleteRequests = this.prisma.movie_Request.deleteMany({
      where: { tmdb_id: movie.tmdb_id },
    });
    const deleteRatings = this.prisma.movie_Rating.deleteMany({
      where: { movieId: id },
    });
    const deleteRatingSummaries = this.prisma.movie_Ratings_Summary.deleteMany({
      where: { movieId: id },
    });
    const deleteMovie = this.prisma.movie.delete({ where: { id } });

    await this.prisma.$transaction([
      deleteRequests,
      deleteRatings,
      deleteRatingSummaries,
      deleteMovie,
    ]);

    return { message: `Movie with id ${id} deleted successfully` };
  }

  async getRandomMovies(): Promise<MovieType[]> {
    const moviesCount = await this.prisma.movie.count();
    const skip =
      moviesCount > 10 ? Math.floor(Math.random() * (moviesCount - 10)) : 0;
    const movies = await this.prisma.movie.findMany({
      skip,
      take: 15,
      select: movieSelect,
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
        select: movieSelect,
      },
      {
        page,
      },
    );
  }

  async findAllV2(
    findMoviesDTO: AdminFindMoviesDTO,
  ): Promise<PaginatedResult<MovieType>> {
    let { title, year, order, orderBy, page } = findMoviesDTO;

    const where: Prisma.MovieWhereInput = {};
    if (title) {
      where.OR = [
        { title: { contains: title, mode: 'insensitive' } },
        { original_title: { contains: title, mode: 'insensitive' } },
      ];
    }
    if (year) {
      where.year = year;
    }
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
        where,
        select: movieSelect,
      },
      {
        page,
      },
    );
  }

  async search(
    query: SearchMovieQueryDto,
  ): Promise<PaginatedResult<MovieType>> {
    let { title, year, order, orderBy, page } = query;
    const where: Prisma.MovieWhereInput = {};

    if (title) {
      where.OR = [
        { title: { contains: title, mode: 'insensitive' } },
        { original_title: { contains: title, mode: 'insensitive' } },
      ];
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
        select: movieSelect,
      },
      {
        page,
      },
    );
    // return await this.prisma.movie.findMany({ where });
  }

  async getCount() {
    const total = await this.prisma.movie.count();
    return { total };
  }

  async getRelatedMovies(slug: string, max: number = 15): Promise<MovieType[]> {
    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      include: { Genre: true },
    });

    if (!movie) throw new NotFoundException(`Movie "${slug}" not found`);

    const genreIds = movie.Genre.map((g) => g.id);

    if (genreIds.length === 0) return [];

    const related = await this.prisma.$queryRaw<
      { id: string; score: number }[]
    >`
    SELECT
        m.id,
        COUNT(mg."A")::text AS common_genres,
        1.0 / (1 + ABS(m.year - ${movie.year}) * 0.1) AS year_score,
        COUNT(mg."A") + 1.0 / (1 + ABS(m.year - ${movie.year}) * 0.1) AS score
    FROM "Movie" m
    JOIN "_GenreToMovie" mg ON mg."B" = m.id
    WHERE mg."A" = ANY(${genreIds}::text[])
        AND m.id != ${movie.id}
    GROUP BY m.id
    ORDER BY score DESC
    LIMIT ${max}
`;

    const relatedIds = related.map((r) => r.id);

    const movies = await this.prisma.movie.findMany({
      where: { id: { in: relatedIds } },
      select: movieSelect,
    });

    const movieById = new Map(movies.map((m) => [m.id, m] as const));

    return relatedIds
      .map((id) => movieById.get(id))
      .filter((m) => m !== undefined);
  }

  async getTopMovies(limit: number = 15): Promise<any[]> {
    const movies = await this.prisma.movie.findMany({
      take: limit,
      where: {
        Movie_Ratings_Summary: {
          isNot: null,
        },
      },
      include: {
        Movie_Ratings_Summary: { select: { score_value: true } },
      },
      orderBy: {
        Movie_Ratings_Summary: {
          score_value: 'desc',
        },
      },
    });
    return movies;
  }
}
