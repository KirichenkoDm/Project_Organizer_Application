import { PartialType } from "@nestjs/mapped-types";
import { CreateRoleDto } from "./create-role.dto";
import { RoleNamesEnum } from "../../../shared/role-names.enum";

export class UpdateRoleDto {
  role: RoleNamesEnum;
}
