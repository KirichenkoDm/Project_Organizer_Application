import { RoleNamesEnum } from "../../../shared/role-names.enum";

export class CreateRoleDto {
  userId: number;
  projectId: number;
  role: RoleNamesEnum;
}
