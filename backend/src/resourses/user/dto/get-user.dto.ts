import { RoleNamesEnum } from "src/resourses";

export class GetUserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export class GetUserWithPasswordDto extends GetUserDto {
  password: string;
}

export class GetUserWithRoleDto extends GetUserDto {
  role: RoleNamesEnum;
}