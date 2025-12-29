import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { roles } from 'src/core/constants/auth';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';

import { AdminUpdateUserFullDTO } from './dto/admin/update-user-full.dto';
import { AdminUpdatePasswordDTO } from './dto/admin/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    const mailAlreadyTaken = await this.adminGetUserWithMail(data.email);
    if (mailAlreadyTaken) throw new Error('Mail already taken');

    const usernameAlreadyTaken = await this.adminGetUserWithUsername(
      data.username,
    );
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

  async findAllPublic() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
      },
      where: {
        deleted_at: null,
      },
    });
  }

  async findAllFull() {
    const paginate: PaginateFunction = paginator({ perPage: 15 });

    return await paginate(this.prismaService.user, {
      omit: {
        password: true,
      },
      where: {
        deleted_at: null,
      },
    });
    return await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOneFull(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id, deleted_at: null },
      omit: {
        password: true,
      },
    });
  }

  async findOnePublic(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async adminUpdateAccountFull(id: string, data: AdminUpdateUserFullDTO) {
    try {
      const isMailTaken = await this.adminGetUserWithMail(data.email);
      if (isMailTaken && isMailTaken.id !== id) {
        throw new BadRequestException('Email already taken');
      }
      return this.prismaService.user.update({
        where: { id },
        data,
        select: {
          id: true,
          username: true,
          email: true,
          created_at: true,
        },
      });
    } catch (error) {
      throw new Error('Error updating user account');
    }
  }

  async adminUpdatePassword(
    id: string,
    updatePassword: AdminUpdatePasswordDTO,
  ) {
    try {
      const { newPassword } = updatePassword;
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return this.prismaService.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      throw new BadRequestException('Error updating user password');
    }
  }

  async updateAccount(id: string, data: UpdateUserDTO) {
    try {
      const isMailTaken = await this.adminGetUserWithMail(data.email);
      if (isMailTaken && isMailTaken.id !== id) {
        throw new BadRequestException('Email already taken');
      }
      return this.prismaService.user.update({
        where: { id },
        data,
        select: {
          id: true,
          username: true,
          email: true,
          created_at: true,
        },
      });
    } catch (error) {
      throw new Error('Error updating user account');
    }
  }

  async updatePassword(id: string, updatePassword: UpdatePasswordDTO) {
    try {
      const { currentPassword, newPassword } = updatePassword;
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error('Current password is incorrect');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return this.prismaService.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      throw new BadRequestException('Error updating user password');
    }
  }

  async remove(id: string) {
    const user = await this.findOneFull(id);
    if (!user) throw new NotFoundException();
    const timestamp = new Date().toISOString();
    user.deleted_at = new Date(timestamp);
    user.email = `${timestamp}-deleted@example.com`;
    user.username = `${timestamp}-deleted`;
    user.role = 'user';
    return this.prismaService.user.update({
      where: { id },
      data: user,
    });
  }

  async adminGetUserWithMail(email: string) {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async adminGetUserWithUsername(username: string) {
    return await this.prismaService.user.findFirst({ where: { username } });
  }

  async banUser(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    return await this.prismaService.user.update({
      data: { verified: false },
      where: { id },
    });
  }

  async getCount() {
    const activeUsers = await this.prismaService.user.count({
      where: { verified: true },
    });
    const total = await this.prismaService.user.count();
    return { activeUsers, total };
  }
}
