import { Expose } from "class-transformer";
import { RoleNamesEnum } from "../../../shared/role-names.enum";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateRoleDto {
  @Expose()
  @IsNotEmpty()
  @IsEnum(RoleNamesEnum)
  role: RoleNamesEnum;
}
