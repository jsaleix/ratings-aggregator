import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateEmailDTO } from './dto/update-email';
import { PrismaService } from 'src/shared/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { roles } from 'src/core/constants/auth';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    const mailAlreadyTaken = await this.getUserWithMail(data.email);
    if (mailAlreadyTaken) throw new Error('Mail already taken');

    const usernameAlreadyTaken = await this.getUserWithUsername(data.username);
    if (usernameAlreadyTaken) throw new Error('Username already taken');

    const password = (await bcrypt.hash(data.password, 10)) as string;
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password,
        role: roles.USER,
      },
    });

    const { id, role, username, email, created_at } = user;
    return { id, role, username, email, created_at };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneFull(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        password: false,
      },
    });
  }

  async findOnePublic(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  updatePassword(id: string, updatePassword: UpdatePasswordDTO) {
    return `This action updates a #${id} user`;
  }

  updateMail(id: string, updateEmailDto: UpdateEmailDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async getUserWithMail(email: string) {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async getUserWithUsername(username: string) {
    return await this.prismaService.user.findFirst({ where: { username } });
  }
}
