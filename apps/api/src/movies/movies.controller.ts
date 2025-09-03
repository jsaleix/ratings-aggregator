import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import { MoviesService } from './services/movies.service';
import { TMDBService } from './services/tmdb.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { SearchMovieQueryDto } from './dto/search-movie-query.dto';
import { FindMoviesDTO } from './dto/find-movies.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from '../auth/decorators/role.decorator';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tmdbService: TMDBService,
  ) {}

  @Public()
  @Get('search')
  async search(@Query() query: SearchMovieQueryDto) {
    return await this.moviesService.search(query);
  }

  @Role('premium', 'mod')
  @Get('search-with-tmdb')
  async searchWithTmdb(@Query() query: SearchMovieQueryDto) {
    return await this.tmdbService.searchByName(query);
  }

  @Role('admin')
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Public()
  @Get()
  async findAll(@Query() query: FindMoviesDTO) {
    return await this.moviesService.findAll(query);
  }

  @Public()
  @Get('/random')
  async getRandomMovies() {
    return await this.moviesService.getRandomMovies();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.findOne(id);
  }

  @Role('admin')
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.remove(id);
  }
}
