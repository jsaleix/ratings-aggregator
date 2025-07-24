import { IsEmail } from 'class-validator';

export class UpdateEmailDTO {
  @IsEmail()
  email: string;
}
