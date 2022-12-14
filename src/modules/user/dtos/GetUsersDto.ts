import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, Validate } from 'class-validator';
import { PaginationDto } from '../../../common/dto';
import { UserRolesEnum } from '../../../common/enums';
import { SortQueryConstraint } from '../../../common/validations/sort.validation';

export class GetUsersDto extends PaginationDto {
  @Validate(SortQueryConstraint, ['name', 'email', 'userType', 'createdAt'])
  sort?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  @IsEnum(UserRolesEnum)
  userType?: UserRolesEnum;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  minCreatedAt?: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  maxCreatedAt?: Date;
}
