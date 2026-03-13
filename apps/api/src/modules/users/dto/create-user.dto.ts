import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}
