import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';

import { MoviesService } from './services/movies.service';
import { TMDBService } from './services/tmdb.service';

import { SearchMovieQueryDto } from './dto/search-movie-query.dto';
import { FindMoviesDTO } from './dto/find-movies.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tmdbService: TMDBService,
  ) {}

  @Public()
  @Get()
  async findAll(@Query() query: FindMoviesDTO) {
    return await this.moviesService.findAll(query);
  }

  @Public()
  @Get('/id/:id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.findOneById(id);
  }

  @Public()
  @Get('search')
  async search(@Query() query: SearchMovieQueryDto) {
    return await this.moviesService.search(query);
  }

  @Get('search-with-tmdb')
  async searchWithTmdb(@Query() query: SearchMovieQueryDto) {
    return await this.tmdbService.searchByName(query);
  }

  @Public()
  @Get('/random')
  async getRandomMovies() {
    return await this.moviesService.getRandomMovies();
  }

  @Public()
  @Get('/related/:slug')
  async getRelatedMovies(@Param('slug') slug: string) {
    return await this.moviesService.getRelatedMovies(slug);
  }

  @Public()
  @Get('/top')
  async getTopMovies() {
    return await this.moviesService.getTopMovies();
  }

  @Public()
  @Get('/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return await this.moviesService.findOneBySlug(slug);
  }
}
