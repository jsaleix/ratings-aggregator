import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('movie/:movieId')
  findForMovie(@Param('movieId', ParseUUIDPipe) movieId: string) {
    return this.ratingsService.findForMovie(movieId);
  }

  @Role('admin')
  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Role('admin')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ratingsService.findOne(id);
  }

  @Role('admin')
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ratingsService.remove(id);
  }
}
