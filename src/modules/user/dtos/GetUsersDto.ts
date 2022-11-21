import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Validate } from 'class-validator';
import { UserRolesEnum } from '../../../common/enums';
import { SortQueryConstraint } from '../../../common/validations/sort.validation';

export class GetUsersDto {
  @Validate(SortQueryConstraint, ['name', 'email', 'userType', 'createdAt'])
  sort?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

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
