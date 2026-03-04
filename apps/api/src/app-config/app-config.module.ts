import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { AppConfigController } from './app_config.controller';

@Global()
@Module({
  controllers: [AppConfigController],
  providers: [AppConfigService, PrismaService],
  exports: [AppConfigService],
})
export class DynamicConfigModule {}
