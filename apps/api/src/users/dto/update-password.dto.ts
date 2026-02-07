import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
