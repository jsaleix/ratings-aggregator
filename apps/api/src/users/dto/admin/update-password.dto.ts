import { IsString, IsStrongPassword } from 'class-validator';

export class AdminUpdatePasswordDTO {
  @IsStrongPassword()
  newPassword: string;
}
