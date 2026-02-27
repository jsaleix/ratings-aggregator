import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AdminFindMoviesDTO {
  @ApiProperty()
  @IsString()
  @IsIn(['id', 'title', 'created_at', 'release_date', 'updated_at'])
  orderBy?: 'id' | 'title' | 'created_at' | 'updated_at' | 'release_date' =
    'release_date';

  @ApiProperty()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsInt()
  @IsPositive()
  page? = 1;

  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  year?: number;
}
