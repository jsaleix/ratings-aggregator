import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppConfigService } from './app-config.service';
import { Role } from 'src/modules/auth/decorators/role.decorator';

@ApiTags('App config')
@Role('admin')
@Controller('app_config')
export class AppConfigController {
  constructor(private readonly appConfigService: AppConfigService) {}
}
