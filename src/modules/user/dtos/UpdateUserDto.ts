import { IsOptional } from 'class-validator';
import { GenderEnum } from 'src/common/enums';
import { SchoolEnum } from 'src/common/enums/school.enum';
import { CreateUserDto } from './UserDto';
// import {SchoolEnum} from school.enum'

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  // @IsOptional()
  // gender: GenderEnum;

  @IsOptional()
  phoneNumber: number;

  @IsOptional()
  school: string;

  @IsOptional()
  years: string;

  @IsOptional()
  subject: string;

  @IsOptional()
  schoolType: SchoolEnum;

  @IsOptional()
  pass: string;
}
