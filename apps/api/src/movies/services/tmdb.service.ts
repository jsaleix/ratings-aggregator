import { Injectable } from '@nestjs/common';
import { SearchMovieQueryDto } from '../dto/search-movie-query.dto';

@Injectable()
export class TMDBService {
  searchByName(query: SearchMovieQueryDto) {
    return `This action adds a new movie ${query.name}`;
  }
}
