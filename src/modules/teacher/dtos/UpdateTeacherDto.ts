import { IsOptional } from 'class-validator';
import { GenderEnum } from 'src/common/enums';
import { CreateTeacherDto } from './CreateTeacherDto';

export class UpdateTeacherDto extends CreateTeacherDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
