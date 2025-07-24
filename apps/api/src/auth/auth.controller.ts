import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.userService.create(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    throw new HttpException(
      'Not implemented yet',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
