import { Module } from '@nestjs/common';
import { DynamicConfigService } from './dynamic-config.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { DynamicConfigController } from './dynamic_config.controller';

@Module({
  controllers: [DynamicConfigController],
  providers: [DynamicConfigService, PrismaService],
})
export class DynamicConfigModule {}
