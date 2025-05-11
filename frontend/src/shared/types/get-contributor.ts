import { RoleNamesEnum } from "../role-names.enum";
import { GetUser } from "./get-user";

export type GetContributor = GetUser & {
  role: RoleNamesEnum;
}