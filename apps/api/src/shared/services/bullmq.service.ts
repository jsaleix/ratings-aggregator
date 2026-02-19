import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QUEUES } from 'src/core/constants/bullmq';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class BullmqService {
  private movieQueue: Queue;
  private summaryQueue: Queue;

  constructor(@InjectRedis() private readonly redis: Redis) {
    const { host, port, password, db } = this.redis.options;

    const connection = { host, port, password, db };

    this.movieQueue = new Queue(QUEUES.movie, {
      connection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    });
    this.summaryQueue = new Queue(QUEUES.summary, {
      connection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    });
  }

  async addRequestToQueue(requestId: string, tmdbId: number) {
    await this.movieQueue.add('add-movie', {
      type: 'add-movie',
      payload: { tmdbId, requestId },
    });
  }

  async generateSummary(movieId: string) {
    await this.summaryQueue.add('generate-summary', {
      type: 'movie',
      payload: { id: movieId },
    });
  }
}
