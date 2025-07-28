import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateEmailDTO } from './dto/update-email';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findSelf(@Req() req) {
    return this.usersService.findOneFull(req.user.id);
  }

  @Patch('me')
  updateSelfProfile(@Body() updateUserDto: UpdateUserDTO, @Req() req) {
    return this.usersService.updateAccount(req.user.id, updateUserDto);
  }

  @Patch('me/password')
  updateSelfPassword(@Body() updatePasswordDto: UpdatePasswordDTO, @Req() req) {
    return this.usersService.updatePassword(req.user.id, updatePasswordDto);
  }

  @Delete('me')
  deleteSelfProfile(@Req() req) {
    return this.usersService.remove(req.user.id);
  }

  @Patch('me/mail')
  updateSelfMail(@Body() updateEmailDto: UpdateEmailDTO, @Req() req) {
    return this.usersService.updateMail(req.user.id, updateEmailDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAllPublic();
  }

  @Role('admin')
  @Get(':id/full')
  findOneFull(@Param('id') id: string) {
    return this.usersService.findOneFull(id);
  }

  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.usersService.findOnePublic(id);
  }

  @Role('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.updateAccount(id, updateUserDto);
  }

  @Role('admin')
  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Role('admin')
  @Patch(':id/mail')
  updateMail(@Param('id') id: string, @Body() updateMailDto: UpdateEmailDTO) {
    return this.usersService.updateMail(id, updateMailDto);
  }

  @Role('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
