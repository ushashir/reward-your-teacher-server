import { IsMongoId } from 'class-validator';

export class ValidIdDto {
  @IsMongoId()
  id: string;
}
