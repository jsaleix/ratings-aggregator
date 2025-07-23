import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FindMoviesDTO } from './find-movies.dto';

export class SearchMovieQueryDto extends FindMoviesDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  year?: number;
}
