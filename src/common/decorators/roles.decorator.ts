import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from '../enums';

export const Roles = (...roles: UserRolesEnum[]) => {
  return SetMetadata('roles', roles);
};
