import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Req() req, @Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto, req.user);
  }

  @Public()
  @Get()
  async findAll() {
    return this.requestsService.findAll(false);
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
