import { RoleNamesEnum } from "../role-names.enum";

export type CreateRole = {
  user: {id: number};
  project: {id: number};
  role: RoleNamesEnum;
}
