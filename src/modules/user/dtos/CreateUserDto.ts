import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { GenderEnum } from 'src/common/enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
