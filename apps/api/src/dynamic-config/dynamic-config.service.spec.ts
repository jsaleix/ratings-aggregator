import { Test, TestingModule } from '@nestjs/testing';
import { DynamicConfigService } from './dynamic-config.service';
import { PrismaService } from 'src/shared/services/prisma.service';

describe('DynamicConfigService', () => {
  let service: DynamicConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicConfigService, PrismaService],
    }).compile();

    service = module.get<DynamicConfigService>(DynamicConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
