import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestDto: CreateRequestDto) {
    const request = await this.prisma.movie_Request.create({
      data: {
        ...createRequestDto,
      },
    });

    if (!request) {
      throw new Error('Failed to create request');
    }

    this.addToQueue(request.id);
    return request;
  }

  async findAll() {
    return this.prisma.movie_Request.findMany();
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

  async addToQueue(id: string) {
    console.log(`Adding request with ID ${id} to the queue`);
  }
}
