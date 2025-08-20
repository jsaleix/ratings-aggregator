import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QUEUES } from 'src/core/constants/bullmq';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class BullmqService {
  private movieQueue: Queue;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.movieQueue = new Queue(QUEUES.movie, {
      connection: this.redis,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    });
  }

  async addRequestToQueue(requestId: string, tmdbId: number) {
    await this.movieQueue.add('add-movie', {
      type: 'add-movie-with-ratings:tmdbId',
      payload: { tmdbId, requestId },
    });
  }
}
