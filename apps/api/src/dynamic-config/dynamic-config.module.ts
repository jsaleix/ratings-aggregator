import { Module } from '@nestjs/common';
import { DynamicConfigService } from './dynamic-config.service';

@Module({
  providers: [DynamicConfigService]
})
export class DynamicConfigModule {}
