import { RoleNamesEnum } from "../role-names.enum";

export type GetContributor = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleNamesEnum;
}