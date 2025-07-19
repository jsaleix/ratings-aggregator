import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { SearchMovieQueryDto } from '../dto/search-movie-query.dto';
import { ConfigService } from '@nestjs/config';
import { EnvType } from 'src/core/configuration';

@Injectable()
export class MoviesService {
  constructor(private configService: ConfigService) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    console.log('Redis Host:', this.configService.get<string>('redis_host'));
    return { message: `This action returns all movies` };
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  search(query: SearchMovieQueryDto) {
    return `This action searches movies with query: ${query.name}`;
  }
}
