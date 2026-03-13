import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class AdminUpdatePasswordDTO {
  @ApiProperty()
  @IsStrongPassword()
  newPassword: string;
}
