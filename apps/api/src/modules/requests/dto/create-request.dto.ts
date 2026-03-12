import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty()
  @IsNumber()
  tmdbId: number;
}
