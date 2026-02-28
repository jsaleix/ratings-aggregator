import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AdminFindRequestsDto {
  @ApiProperty()
  @IsString()
  @IsIn(['id', 'created_at'])
  orderBy?: 'id' | 'created_at' = 'created_at';

  @ApiProperty()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsInt()
  @IsPositive()
  page? = 1;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  processed?: boolean;
}
