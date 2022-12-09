import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class QueryParamDto {
  @IsDefined()
  @IsNumber()
  // @Type(()=>Boolean)
  @Transform((value) => {
    if (typeof value === 'string') {
      parseInt(value);
    }
    return value;
  })
  filter: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  page: number;

  @IsDefined()
  @IsNumber()
  limit: number;
}
