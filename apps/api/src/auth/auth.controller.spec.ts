import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';

import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;
  let redisMock = {} as unknown as Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        PrismaService,
        ConfigService,
        {
          provide: getRedisConnectionToken(),
          useValue: redisMock,
        },
      ],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '50400s' }, // 14h
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
