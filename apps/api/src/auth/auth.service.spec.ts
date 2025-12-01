import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken, RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/shared/services/prisma.service';

import { AuthService } from './auth.service';
import Redis from 'ioredis';

describe('AuthService', () => {
  let service: AuthService;
  let redisMock = {} as unknown as Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        PrismaService,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
