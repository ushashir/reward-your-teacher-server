import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { SchoolEnum } from 'src/common/enums/school.enum';
import { GenderEnum, UserRolesEnum } from '../../../common/enums';

class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(UserRolesEnum)
  userType?: UserRolesEnum;
}

export class CreateUserDto extends BaseUserDto {
  @MinLength(6)
  password?: string;

  @IsOptional()
  school?: string;
}

export class UpdateUserDto extends BaseUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  userType: UserRolesEnum;

  @IsOptional()
  gender: GenderEnum;

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
}
