import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { UsersService } from 'src/modules/users/users.service';
import { RequestsService } from 'src/modules/requests/services/requests.service';
import { MoviesService } from 'src/modules/movies/services/movies.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';

@Module({
  controllers: [StatsController],
  providers: [
    StatsService,
    UsersService,
    RequestsService,
    MoviesService,
    PrismaService,
    BullmqService
  ],
})
export class StatsModule {}
