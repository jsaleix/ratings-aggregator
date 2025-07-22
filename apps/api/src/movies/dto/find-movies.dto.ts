import { IsIn, IsInt, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindMoviesDTO {
  @IsString()
  @IsIn(['id', 'title', 'created_at'])
  orderBy?: 'id' | 'title' | 'created_at' = 'id';

  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @Transform(({ value }) => +value)
  @IsInt()
  @IsPositive()
  page? = 1;
}
