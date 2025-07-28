import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDTO {
  @IsStrongPassword()
  newPassword: string;

  @IsString()
  currentPassword: string;
}
