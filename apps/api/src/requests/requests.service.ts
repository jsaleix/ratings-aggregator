import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BullmqService } from 'src/shared/services/bullmq.service';
import { User } from 'generated/prisma/client';

@Injectable()
export class RequestsService {
  constructor(
    private prisma: PrismaService,
    private bullmqService: BullmqService,
  ) {}

  async create({ tmdbId }: CreateRequestDto, user: User) {
    const request = await this.prisma.movie_Request.create({
      data: {
        title: '',
        tmdb_id: tmdbId,
        userId: user.id,
      },
    });

    if (!request) {
      throw new Error('Failed to create request');
    }

    this.addToQueue(request.id, request.tmdb_id);
    return request;
  }

  async findAllPublic(processed: boolean) {
    return this.prisma.movie_Request.findMany({
      where: { processed },
      omit: { userId: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.movie_Request.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.movie_Request.delete({
      where: { id },
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
