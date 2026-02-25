import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // <-- ME
  @Get('me')
  async findSelf(@Req() req) {
    const res = await this.usersService.findOneFull(req.user.id);
    if (!res) throw new NotFoundException();
    const { deleted_at, ...rest } = res;
    return rest;
  }

  @Patch('me')
  updateSelfProfile(@Body() updateUserDto: UpdateUserDTO, @Req() req) {
    return this.usersService.updateAccount(req.user.id, updateUserDto);
  }

  @Patch('me/password')
  async updateSelfPassword(
    @Body() updatePasswordDto: UpdatePasswordDTO,
    @Req() req,
  ) {
    return await this.usersService.updatePassword(
      req.user.id,
      updatePasswordDto,
    );
  }

  @Delete('me')
  async deleteSelfProfile(@Req() req) {
    const res = await this.usersService.remove(req.user.id);
    return { deleted: !!res.deleted_at };
  }

  // --> ME
}
