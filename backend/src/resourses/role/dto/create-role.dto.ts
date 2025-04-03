import { RoleNamesEnum } from "../role-names.enum";

export class CreateRoleDto {
  userid: number;
  projectid: number;
  role: RoleNamesEnum;
}
