import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './movies.controller';
import { TMDBService } from './services/tmdb.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, TMDBService, PrismaService],
})
export class MoviesModule {}
