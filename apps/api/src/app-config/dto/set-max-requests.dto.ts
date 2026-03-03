import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SetMaxRequestsDTO {
  @ApiProperty({
    description: 'This is the maximum number of requests allowed per day',
  })
  @IsNumber()
  value: number;
}
