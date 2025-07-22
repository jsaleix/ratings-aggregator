import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { EnvType } from 'src/core/configuration';
import { QUEUES } from 'src/core/constants/bullmq';
import IORedis from 'ioredis';

@Injectable()
export class BullmqService {
  private movieQueue: Queue;

  constructor(private readonly configService: ConfigService<EnvType>) {
    const redisConnection = new IORedis({
      host: this.configService.get<string>('redis_host'),
      port: this.configService.get<number>('redis_port'),
      password: this.configService.get<string>('redis_password'),
    });
    this.movieQueue = new Queue(QUEUES.movie, {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    });
  }

  async addMovieToQueue(tmdbId: number) {
    await this.movieQueue.add('add-movie', {
      type: 'add-movie-with-ratings:tmdbId',
      payload: { tmdbId },
    });
  }
}
