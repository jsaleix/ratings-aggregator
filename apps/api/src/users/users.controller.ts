import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from 'src/auth/decorators/role.decorator';

import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { AdminUpdateUserFullDTO } from './dto/admin/update-user-full.dto';
import { AdminUpdatePasswordDTO } from './dto/admin/update-password.dto';

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
    const { password, deleted_at, ...rest } =
      await this.usersService.updatePassword(req.user.id, updatePasswordDto);
    return rest;
  }

  @Delete('me')
  async deleteSelfProfile(@Req() req) {
    const res = await this.usersService.remove(req.user.id);
    return { deleted: !!res.deleted_at };
  }

  // --> ME

  // <-- ADMIN
  @Role('admin')
  @Get()
  findAll() {
    return this.usersService.findAllFull();
  }

  @Role('admin')
  @Get(':id/full')
  findOneFull(@Param('id') id: string) {
    return this.usersService.findOneFull(id);
  }

  @Role('admin')
  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.usersService.findOnePublic(id);
  }

  @Role('admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: AdminUpdateUserFullDTO,
  ) {
    return this.usersService.updateAccount(id, updateUserDto);
  }

  @Role('admin')
  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: AdminUpdatePasswordDTO,
  ) {
    return this.usersService.adminUpdatePassword(id, updatePasswordDto);
  }

  @Role('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // --> ADMIN
}
