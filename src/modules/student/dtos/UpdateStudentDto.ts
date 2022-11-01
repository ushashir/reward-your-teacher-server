import { IsOptional } from 'class-validator';
import { GenderEnum } from 'src/common/enums';
import { CreateStudentDto } from './CreateStudentDto';

export class UpdateStudentDto extends CreateStudentDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
