import { RoleNamesEnum } from "../role-names.enum";

export class CreateRoleDto {
  userId: number;
  projectId: number;
  role: RoleNamesEnum;
}
