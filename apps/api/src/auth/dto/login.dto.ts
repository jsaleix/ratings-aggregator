import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
