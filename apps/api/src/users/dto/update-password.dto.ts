import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @IsStrongPassword()
  newPassword: string;

  @IsString()
  currentPassword: string;
}
