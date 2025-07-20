import { IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  tmdbId: number;

  @IsString()
  title: string;
}
