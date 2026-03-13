import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MoviesService } from './services/movies.service';
import { Role } from 'src/modules/auth/decorators/role.decorator';
import { AdminFindMoviesDTO } from './dto/admin/find-movies.dto';

@ApiTags('Movies Admin')
@Controller('movies/admin')
@Role('admin')
export class MoviesAdminController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/all')
  async findAll(@Query() query: AdminFindMoviesDTO) {
    return await this.moviesService.findAllV2(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOneById(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.remove(id);
  }
}
