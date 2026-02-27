import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './movies.controller';
import { TMDBService } from './services/tmdb.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MoviesAdminController } from './movies-admin.controller';

@Module({
  controllers: [MoviesController, MoviesAdminController],
  providers: [MoviesService, TMDBService, PrismaService],
})
export class MoviesModule {}
