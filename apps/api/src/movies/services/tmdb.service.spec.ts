import { Test, TestingModule } from '@nestjs/testing';
import { TMDBService } from './tmdb.service';
import { ConfigModule } from '@nestjs/config';

describe('TMDBService', () => {
  let service: TMDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TMDBService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<TMDBService>(TMDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
