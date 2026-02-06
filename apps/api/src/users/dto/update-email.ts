import { IsEmail, IsString } from 'class-validator';

export class UpdateEmailDTO {
  @IsString()
  @IsEmail()
  email: string;
}
