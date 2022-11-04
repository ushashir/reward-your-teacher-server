import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRolesEnum } from '../../../common/enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(UserRolesEnum)
  userType: UserRolesEnum;
}
