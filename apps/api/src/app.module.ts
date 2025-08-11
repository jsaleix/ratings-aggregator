import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import configuration from './core/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import { RequestsModule } from './requests/requests.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DynamicConfigModule } from './dynamic-config/dynamic-config.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 80,
        },
      ],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MoviesModule,
    RatingsModule,
    RequestsModule,
    UsersModule,
    AuthModule,
    DynamicConfigModule,
    SummaryModule,
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
