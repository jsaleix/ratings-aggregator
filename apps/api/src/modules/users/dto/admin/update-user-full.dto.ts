import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from 'src/core/constants/auth';

export class AdminUpdateUserFullDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['admin', 'user', 'mod', 'premium'] })
  @IsString()
  @IsIn(['admin', 'user', 'mod', 'premium'])
  role: RoleType;
}
