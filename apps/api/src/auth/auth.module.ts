import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService, UsersService, PrismaService],
})
export class AuthModule {}
