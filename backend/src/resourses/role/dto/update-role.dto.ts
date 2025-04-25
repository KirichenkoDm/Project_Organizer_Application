import { RoleNamesEnum } from "../../../shared/role-names.enum";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateRoleDto {
  
  @IsNotEmpty()
  @IsEnum(RoleNamesEnum)
  role: RoleNamesEnum;
}
