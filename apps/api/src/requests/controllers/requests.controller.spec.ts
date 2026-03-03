import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { RequestsController } from './requests.controller';
import { RequestsService } from '../services/requests.service';
import { DynamicConfigService } from 'src/dynamic-config/dynamic-config.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { RequestsQuotaService } from '../services/requests-quota.service';

describe('RequestsController', () => {
  let controller: RequestsController;
  let redisMock = {} as unknown as Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        RequestsService,
        RequestsQuotaService,
        PrismaService,
        DynamicConfigService,
        {
          provide: BullmqService,
          useValue: jest.fn(),
        },
        { provide: getRedisConnectionToken(), useValue: redisMock },
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
