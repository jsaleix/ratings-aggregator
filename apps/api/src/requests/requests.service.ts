import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';

import { CreateRequestDto } from './dto/create-request.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import {
  MovieRequestPublicType,
  movieRequestSelect,
} from './entities/request.entity';
import { RequestAlreadyPendingError } from './errors/request_already_pending.error';

@Injectable()
export class RequestsService {
  constructor(
    private prisma: PrismaService,
    private bullmqService: BullmqService,
  ) {}

  async create(tmdbId: number, user: User): Promise<MovieRequestPublicType> {
    // Checks if there is no pending request for the same movie
    const alreadyPendingRequest = await this.prisma.movie_Request.findFirst({
      where: {
        tmdb_id: tmdbId,
        processed: false,
      },
    });
    if (alreadyPendingRequest) throw new RequestAlreadyPendingError();
    const request = await this.prisma.movie_Request.create({
      data: {
        title: '',
        tmdb_id: tmdbId,
        userId: user.id,
      },
      select: movieRequestSelect,
    });

    await this.addToQueue(request.id, request.tmdb_id);
    return request;
  }

  async findAllPublic(processed: boolean): Promise<MovieRequestPublicType[]> {
    return this.prisma.movie_Request.findMany({
      where: { processed },
      select: movieRequestSelect,
    });
  }

  async findOne(id: string): Promise<MovieRequestPublicType | null> {
    return this.prisma.movie_Request.findUnique({
      where: { id },
      select: movieRequestSelect,
    });
  }

  async remove(id: string): Promise<MovieRequestPublicType> {
    return this.prisma.movie_Request.delete({
      where: { id },
      select: movieRequestSelect,
    });
  }

  async getCountForToday() {
    return await this.prisma.movie_Request.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
  }

  private async addToQueue(requestId: string, tmdbId: number) {
    this.bullmqService.addRequestToQueue(requestId, tmdbId);
  }

  async getRequestsCountOfTheToday() {
    return await this.prisma.movie_Request.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
  }

  async getCount() {
    const total = await this.prisma.movie_Request.count();
    return { total };
  }
}
