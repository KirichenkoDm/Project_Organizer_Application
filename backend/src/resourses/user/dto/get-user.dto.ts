import { RoleNamesEnum } from "src/shared/role-names.enum";

export class GetUserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export class GetUserWithPasswordDto extends GetUserDto {
  password: string;
}

export class GetUserWithRoleDto extends GetUserDto {
  role: RoleNamesEnum;
}