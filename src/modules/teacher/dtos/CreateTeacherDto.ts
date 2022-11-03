import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { GenderEnum } from 'src/common/enums';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
