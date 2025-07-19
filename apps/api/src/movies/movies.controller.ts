import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { TMDBService } from './services/tmdb.service';
import { SearchMovieQueryDto } from './dto/search-movie-query.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tmdbService: TMDBService,
  ) {}

  @Get('search')
  search(@Query() query: SearchMovieQueryDto) {
    return this.moviesService.search(query);
  }

  @Get('search-with-tmdb')
  searchWithTmdb(@Query() query: SearchMovieQueryDto) {
    return this.tmdbService.searchByName(query);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.remove(+id);
  }
}
