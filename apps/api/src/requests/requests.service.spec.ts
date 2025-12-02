import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import Redis from 'ioredis';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';

describe('RequestsService', () => {
  let service: RequestsService;
  let redisMock = {} as unknown as Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        PrismaService,
        {
          provide: BullmqService,
          useValue: jest.fn(),
        },
        { provide: getRedisConnectionToken(), useValue: redisMock },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
