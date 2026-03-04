import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';

import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import {
  movieRequestAdminSelect,
  MovieRequestAdminType,
  MovieRequestPublicType,
  movieRequestSelect,
} from '../entities/request.entity';
import { RequestAlreadyPendingError } from '../errors/request_already_pending.error';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination';
import { PaginatedResult } from 'src/shared/types/pagination';
import { AdminFindRequestsDto } from '../dto/admin/find-movies.dto';

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

  async findAllAdmin(
    dto: AdminFindRequestsDto,
  ): Promise<PaginatedResult<MovieRequestAdminType[]>> {
    let { page, order, orderBy, processed } = dto;
    const where: Prisma.Movie_RequestWhereInput = {};

    if (!orderBy) orderBy = 'created_at';
    if (!order) order = 'desc';
    if (!page) page = 1;

    if (processed !== undefined) {
      where.processed = processed;
    }

    const paginate: PaginateFunction = paginator({ perPage: 15 });
    return await paginate(
      this.prisma.movie_Request,
      {
        orderBy: {
          [orderBy]: order,
        },
        select: movieRequestAdminSelect,
        where,
      },
      {
        page,
      },
    );
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

  private async addToQueue(requestId: string, tmdbId: number) {
    this.bullmqService.addRequestToQueue(requestId, tmdbId);
  }

  async getCount() {
    const total = await this.prisma.movie_Request.count();
    return { total };
  }
}
