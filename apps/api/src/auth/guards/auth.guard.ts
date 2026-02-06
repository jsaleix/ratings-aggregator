import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { EnvType } from 'src/core/configuration';
import { UsersService } from 'src/users/users.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvType>,
    private userService: UsersService,
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }

    const isBlacklisted = await this.redis.get(token);
    if (isBlacklisted) {
      return false;
    }

    try {
      const secret = this.configService.get('jwt_secret');
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      const user = await this.userService.findOneFull(payload.sub);
      if (!user) throw new Error('No user found');
      if (user.deleted_at) throw new Error('User is deleted');
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
