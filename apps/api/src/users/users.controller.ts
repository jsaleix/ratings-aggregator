import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateEmailDTO } from './dto/update-email';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findSelf() {}

  @Patch('me')
  updateSelfProfile() {}

  @Patch('me/password')
  updateSelfPassword() {}

  @Patch('me/mail')
  updateSelfMail() {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/full')
  findOneFull(@Param('id') id: string) {
    return this.usersService.findOneFull(id);
  }

  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.usersService.findOnePublic(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Patch(':id/mail')
  updateMail(@Param('id') id: string, @Body() updateMailDto: UpdateEmailDTO) {
    return this.usersService.updateMail(id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
