import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { Role } from 'src/auth/decorators/role.decorator';

import { AdminUpdateUserFullDTO } from './dto/admin/update-user-full.dto';
import { AdminUpdatePasswordDTO } from './dto/admin/update-password.dto';

@Controller('users/admin')
@Role('admin')
export class UsersAdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAllFull();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneFull(id);
  }

  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.usersService.findOnePublic(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: AdminUpdateUserFullDTO,
  ) {
    return this.usersService.updateAccount(id, updateUserDto);
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: AdminUpdatePasswordDTO,
  ) {
    return this.usersService.adminUpdatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/ban')
  banUser(@Param('id') id: string) {
    return this.usersService.banUser(id);
  }
}
