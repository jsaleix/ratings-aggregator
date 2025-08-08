import { IsNumber } from 'class-validator';

export class SetMaxRequestsDTO {
  @IsNumber()
  value: number;
}
