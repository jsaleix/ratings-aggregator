import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@nestjs/cache-manager';

import configuration from './core/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import { RequestsModule } from './requests/requests.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SummaryModule } from './summary/summary.module';
import { CompareModule } from './compare/compare.module';
import { StatsModule } from './stats/stats.module';
import { PipelineModule } from './pipelines/pipeline.module';
import { SSEModule } from './infra/sse/pipeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RedisModule.forRoot({ type: 'single', url: process.env.REDIS_URL }),
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 80,
        },
      ],
    }),
    MoviesModule,
    RatingsModule,
    RequestsModule,
    UsersModule,
    AuthModule,
    SummaryModule,
    CompareModule,
    StatsModule,
    PipelineModule,
    SSEModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
