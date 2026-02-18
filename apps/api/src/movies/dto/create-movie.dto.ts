import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  original_title: string;

  @IsString()
  language: string;

  @IsString()
  tag_line: string;

  @IsString()
  summary: string;

  @IsNumber()
  runtime: number;

  @IsString()
  @Transform(({ value }) => new Date(value).toISOString())
  release_date: string;

  @IsNumber()
  year: number;

  @IsNumber()
  budget: number;

  @IsString()
  poster_path: string;

  @IsNumber()
  tmdb_id: number;

  @IsString()
  imdb_id: string;
}
