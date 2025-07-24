import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.userService.create(data);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
