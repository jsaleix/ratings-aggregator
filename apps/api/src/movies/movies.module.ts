import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './movies.controller';
import { TMDBService } from './services/tmdb.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, TMDBService],
})
export class MoviesModule {}
