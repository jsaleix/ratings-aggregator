import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Req,
  Post,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestsService } from '../services/requests.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { AddMultipleRequestsDTO } from '../dto/admin/add-multiple-requests.dto';
import { AdminFindRequestsDto } from '../dto/admin/find-movies.dto';
import { SetMaxRequestsDTO } from 'src/app-config/dto/set-max-requests.dto';
import { RequestsQuotaService } from '../services/requests-quota.service';

@ApiTags('Requests Admin')
@Controller('requests/admin')
@Role('admin')
export class RequestsAdminController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly requestsQuotaService: RequestsQuotaService,
  ) {}

  @Post('multiple')
  async createMultiple(
    @Req() req,
    @Body() { tmdbIds }: AddMultipleRequestsDTO,
  ) {
    const promises = tmdbIds.map((tmdbId) =>
      this.requestsService.create(tmdbId, req.user),
    );
    const res = await Promise.allSettled(promises);

    return res;
  }

  @Get()
  async getAll(@Query() query: AdminFindRequestsDto) {
    return await this.requestsService.findAllAdmin(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }

  @Patch('/quota/max')
  async setMaxQuota(@Body() setMaxRequestsDTO: SetMaxRequestsDTO) {
    const res = await this.requestsQuotaService.setMaxRequests(
      setMaxRequestsDTO.value,
    );
    return { max_requests: res };
  }
}
