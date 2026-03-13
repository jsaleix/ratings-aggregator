import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class AddMultipleRequestsDTO {
  @ApiProperty()
  @IsArray()
  @Type(() => Number)
  tmdbIds: number[];
}
