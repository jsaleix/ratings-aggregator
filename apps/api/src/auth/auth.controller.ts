import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';

import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { EnvType } from 'src/core/configuration';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private configService: ConfigService<EnvType>,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 120000 } })
  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.userService.create(data);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, expiresAt } = await this.authService.login(data);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: new Date(expiresAt),
    });
    return { success: true };
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('logout')
  @HttpCode(204)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies.access_token;
    await this.authService.logout(token);
    return;
  }
}
