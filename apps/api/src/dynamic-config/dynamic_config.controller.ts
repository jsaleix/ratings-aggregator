import { Body, Controller, Get, Patch } from '@nestjs/common';

import { DynamicConfigService } from './dynamic-config.service';
import { SetMaxRequestsDTO } from './dto/set-max-requests.dto';
import { Role } from 'src/auth/decorators/role.decorator';

@Role('admin')
@Controller('config')
export class DynamicConfigController {
  constructor(private readonly dynamicConfigService: DynamicConfigService) {}

  @Get('max_requests')
  async getMaxRequests() {
    const res = await this.dynamicConfigService.getMaxRequests();
    return { max_requests: res };
  }

  @Patch('max_requests')
  async updateMaxRequests(@Body() setMaxRequestsDTO: SetMaxRequestsDTO) {
    const res = await this.dynamicConfigService.setMaxRequests(
      setMaxRequestsDTO.value,
    );
    return { max_requests: res };
  }
}
