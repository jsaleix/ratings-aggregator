import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { compareSync } from 'bcrypt';
import Redis from 'ioredis';

import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { EnvType } from 'src/core/configuration';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    @InjectRedis() private readonly redis: Redis,
    private configService: ConfigService<EnvType>,
  ) {}

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userService.adminGetUserWithMail(email);
    if (!user) throw new NotFoundException();
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const expiresAt = Date.now() + 48 * 60 * 60 * 1000; // 48 hours

    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: '48h',
        secret: this.configService.get('jwt_secret'),
      }),
      expiresAt,
    };
  }

  async logout(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('jwt_secret'),
      });
      const expiration = decoded.exp * 1000;

      const current = Date.now();
      const ttl = expiration - current;

      if (ttl > 0) {
        await this.redis.set(token, 'jwt:blacklisted', 'PX', ttl);
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
