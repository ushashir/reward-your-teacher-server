import { IsNotEmpty } from 'class-validator';

export class ValidIdDto {
  @IsNotEmpty()
  id: string;
}
