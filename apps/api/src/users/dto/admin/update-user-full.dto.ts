import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from 'src/core/constants/auth';

export class AdminUpdateUserFullDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['admin', 'user', 'mod', 'premium'])
  role: RoleType;
}
