import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 120000 } })
  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.userService.create(data);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
