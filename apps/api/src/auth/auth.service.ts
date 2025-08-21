import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

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

    const expiresAt = Date.now() + 3600 * 14000; // 14 hours

    return {
      token: await this.jwtService.signAsync(payload, {
        // expiresIn: '14h',
        // secret: process.env.JWT_SECRET,
      }),
      expiresAt,
    };
  }

  async logout(token: string) {
    const decoded = this.jwtService.decode(token);
    const expiration = decoded.exp * 1000;

    const current = Date.now();
    const ttl = expiration - current;

    if (ttl > 0) {
      await this.redis.set(token, 'jwt:blacklisted', 'PX', ttl);
    }
  }
}
