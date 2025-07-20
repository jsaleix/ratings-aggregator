import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchMovieQueryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  year?: number;
}
