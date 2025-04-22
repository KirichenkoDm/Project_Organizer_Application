import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { RoleNamesEnum } from "../../../shared/role-names.enum";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;
  
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @IsNotEmpty()
  @IsEnum(RoleNamesEnum)
  role: RoleNamesEnum;
}
