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

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tmdbService: TMDBService,
  ) {}

  @Get('search')
  async search(@Query() query: SearchMovieQueryDto) {
    return await this.moviesService.search(query);
  }

  @Get('search-with-tmdb')
  async searchWithTmdb(@Query() query: SearchMovieQueryDto) {
    return await this.tmdbService.searchByName(query);
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.remove(id);
  }
}
