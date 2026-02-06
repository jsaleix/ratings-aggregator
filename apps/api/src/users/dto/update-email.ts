import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
