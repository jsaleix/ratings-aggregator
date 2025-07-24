import { IsStrongPassword } from 'class-validator';

export class UpdatePasswordDTO {
  @IsStrongPassword()
  password: string;
}
