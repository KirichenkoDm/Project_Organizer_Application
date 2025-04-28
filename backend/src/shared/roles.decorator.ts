import { applyDecorators, SetMetadata } from '@nestjs/common';
import { RoleNamesEnum } from './role-names.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleNamesEnum[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    SetMetadata(SKIP_ROLES_KEY, false)
  );
};

export const SKIP_ROLES_KEY = 'skipRoles';
export const SkipRoles = () => SetMetadata(SKIP_ROLES_KEY, true);