import { Controller, Get, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Role } from 'src/modules/auth/decorators/role.decorator';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('movie/:slug')
  findForMovie(@Param('slug') slug: string) {
    return this.ratingsService.findForMovie(slug);
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
