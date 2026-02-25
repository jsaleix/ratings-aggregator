import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { LimitRequestsGuard } from './guards/limit-requests.guard';
import { DynamicConfigService } from 'src/dynamic-config/dynamic-config.service';
import { RequestAlreadyPendingError } from './errors/request_already_pending.error';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private dynamicConfigService: DynamicConfigService,
  ) {}

  @UseGuards(LimitRequestsGuard)
  @Post()
  async create(@Req() req, @Body() createRequestDto: CreateRequestDto) {
    try {
      return await this.requestsService.create(createRequestDto, req.user);
    } catch (e: any) {
      if (e instanceof RequestAlreadyPendingError)
        throw new HttpException(e.message, 409);
      throw e;
    }
  }

  @Public()
  @Get('count')
  async getCountForToday() {
    const current = await this.requestsService.getCountForToday();
    const max = await this.dynamicConfigService.getMaxRequests();
    let left = max !== null ? max - current : null;
    if (left !== null && left < 0) {
      left = 0; // Ensure left is not negative
    }

    return {
      current,
      max,
      left,
    };
  }

  @Public()
  @Get()
  async findAllPublic() {
    return this.requestsService.findAllPublic(false);
  }

  @Role('admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @Role('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
