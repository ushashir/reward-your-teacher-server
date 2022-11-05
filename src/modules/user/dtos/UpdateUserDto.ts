import { IsOptional } from 'class-validator';
import { GenderEnum } from 'src/common/enums';
import { CreateUserDto } from './UserDto';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  gender: GenderEnum;

  @IsOptional()
  pass: string;
}
