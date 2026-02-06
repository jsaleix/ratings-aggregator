import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    @InjectRedis() private readonly redis: Redis,
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
        secret: process.env.JWT_SECRET,
      }),
      expiresAt,
    };
  }

  async logout(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
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
