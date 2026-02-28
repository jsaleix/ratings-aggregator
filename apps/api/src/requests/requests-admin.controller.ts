import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Req,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestsService } from './requests.service';
import { Role } from 'src/auth/decorators/role.decorator';
import { AddMultipleRequestsDTO } from './dto/add-multiple-requests.dto';

@ApiTags('Requests Admin')
@Controller('requests/admin')
@Role('admin')
export class RequestsAdminController {
  constructor(private readonly requestsService: RequestsService) {}

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
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
