import { IsIn, IsInt, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindMoviesDTO {
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
}
