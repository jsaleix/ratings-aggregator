import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import { RequestsModule } from './requests/requests.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DynamicConfigModule } from './dynamic-config/dynamic-config.module';
import configuration from './core/configuration';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
