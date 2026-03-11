import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { RequestsController } from './requests.controller';
import { RequestsService } from '../services/requests.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { RequestsQuotaService } from '../services/requests-quota.service';
import { AppConfigService } from 'src/app-config/app-config.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MovieJobPipelineService } from 'src/pipelines/services/movie-job-pipeline.service';

describe('RequestsController', () => {
  let controller: RequestsController;
  let redisMock = {} as unknown as Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        AppConfigService,
        { provide: CACHE_MANAGER, useValue: jest.fn() },
        RequestsService,
        RequestsQuotaService,
        PrismaService,
        {
          provide: BullmqService,
          useValue: jest.fn(),
        },
        { provide: getRedisConnectionToken(), useValue: redisMock },
        MovieJobPipelineService,
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
