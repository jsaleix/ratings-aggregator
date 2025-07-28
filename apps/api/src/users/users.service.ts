import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAllPublic() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  }

  async findAllFull() {
    return await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOneFull(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      omit: {
        password: true,
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

  updateAccount(id: string, updateUserDTO: UpdateUserDTO) {
    try {
      return this.prismaService.user.update({
        where: { id },
        data: updateUserDTO,
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

  async updateMail(id: string, updateEmailDto: UpdateEmailDTO) {
    try {
      const mailAlreadyTaken = await this.getUserWithMail(updateEmailDto.email);
      if (mailAlreadyTaken && mailAlreadyTaken.id !== id) {
        throw new Error('Email already taken');
      }
      return this.prismaService.user.update({
        where: { id },
        data: { email: updateEmailDto.email },
      });
    } catch (error) {
      throw new Error('Error updating user email');
    }
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
