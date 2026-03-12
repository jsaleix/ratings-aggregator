import { IsNotEmpty, IsUUID } from 'class-validator';

export class CompareMoviesQueryDto {
  @IsUUID()
  @IsNotEmpty()
  movieA: string;

  @IsUUID()
  @IsNotEmpty()
  movieB: string;
}
