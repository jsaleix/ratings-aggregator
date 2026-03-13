import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './services/movies.service';
import { TMDBService } from './services/tmdb.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService, TMDBService, PrismaService],
      imports: [ConfigModule.forRoot({})],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
