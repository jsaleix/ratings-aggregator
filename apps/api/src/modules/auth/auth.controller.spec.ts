import { Test, TestingModule } from '@nestjs/testing';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import { Response } from 'express';
import Redis from 'ioredis';

import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let configService: ConfigService;
  let usersService: UsersService;
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
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    it('should set secure cookie to true in production', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123!' };
      const mockUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        role: 'USER',
        password: '$2b$10$hashedpassword',
      };

      jest.spyOn(configService, 'get').mockReturnValue('production');
      jest.spyOn(usersService, 'adminGetUserWithMail').mockResolvedValue(mockUser as any);
      jest.spyOn(authService, 'login').mockResolvedValue({
        token: 'test-token',
        expiresAt: Date.now() + 48 * 60 * 60 * 1000,
      });

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      const result = await controller.login(loginDto, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'test-token',
        expect.objectContaining({
          httpOnly: true,
          secure: true,
          expires: expect.any(Date),
        }),
      );
      expect(result).toEqual({ success: true });
    });

    it('should set secure cookie to false in development', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123!' };
      const mockUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        role: 'USER',
        password: '$2b$10$hashedpassword',
      };

      jest.spyOn(configService, 'get').mockReturnValue('development');
      jest.spyOn(usersService, 'adminGetUserWithMail').mockResolvedValue(mockUser as any);
      jest.spyOn(authService, 'login').mockResolvedValue({
        token: 'test-token',
        expiresAt: Date.now() + 48 * 60 * 60 * 1000,
      });

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      const result = await controller.login(loginDto, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'test-token',
        expect.objectContaining({
          httpOnly: true,
          secure: false,
          expires: expect.any(Date),
        }),
      );
      expect(result).toEqual({ success: true });
    });

    it('should set httpOnly cookie flag always', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123!' };
      const expiresAt = Date.now() + 48 * 60 * 60 * 1000;

      jest.spyOn(configService, 'get').mockReturnValue('production');
      jest.spyOn(authService, 'login').mockResolvedValue({
        token: 'test-token',
        expiresAt,
      });

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      await controller.login(loginDto, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'test-token',
        expect.objectContaining({
          httpOnly: true,
          expires: new Date(expiresAt),
        }),
      );
    });
  });
});
