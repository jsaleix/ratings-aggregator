import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';

import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let redisMock = {} as unknown as Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
