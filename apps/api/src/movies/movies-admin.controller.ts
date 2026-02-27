import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/role.decorator';
import { FindMoviesDTO } from './dto/find-movies.dto';
import { AdminFindMoviesDTO } from './dto/admin/find-movies.dto';

@ApiTags('Movies Admin')
@Controller('movies/admin')
@Role('admin')
export class MoviesAdminController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(@Query() query: AdminFindMoviesDTO) {
    return await this.moviesService.findAllV2(query);
  }

  @Post()
  async refreshMovies(@Body() data: unknown) {
    throw new NotImplementedException();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.moviesService.remove(id);
  }
}
