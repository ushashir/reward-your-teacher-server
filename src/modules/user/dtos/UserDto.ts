import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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
}

export class UpdateUserDto extends BaseUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  userType?: UserRolesEnum;

  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  phoneNumber?: number;

  @IsOptional()
  periodOfTeaching?: string;

  @IsOptional()
  subjects?: string[];

  @IsOptional()
  @IsString()
  schoolId?: number;

  @IsOptional()
  profilePicture?: any;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  about?: string;
}
