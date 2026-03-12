import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Public } from 'src/modules/auth/decorators/public.decorator';
import { RequestsService } from '../services/requests.service';
import { CreateRequestDto } from '../dto/create-request.dto';
import { LimitRequestsGuard } from '../guards/limit-requests.guard';
import { RequestAlreadyPendingError } from '../errors/request_already_pending.error';
import { RequestsQuotaService } from '../services/requests-quota.service';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly requestsQuotaService: RequestsQuotaService,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 6000 } })
  @UseGuards(LimitRequestsGuard)
  @Post()
  async create(@Req() req, @Body() createRequestDto: CreateRequestDto) {
    try {
      const { tmdbId } = createRequestDto;
      return await this.requestsService.create(tmdbId, req.user);
    } catch (e: any) {
      if (e instanceof RequestAlreadyPendingError)
        throw new HttpException(e.message, 409);
      throw e;
    }
  }

  @Public()
  @Get('quota')
  async getCountForToday() {
    return await this.requestsQuotaService.getCurrentQuota();
  }

  @Public()
  @Get()
  async findAllPublic() {
    return this.requestsService.findAllPublic(false);
  }
}
