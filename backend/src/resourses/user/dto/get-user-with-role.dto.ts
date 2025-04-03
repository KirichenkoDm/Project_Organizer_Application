import { RoleNamesEnum } from "src/resourses/role";
import { GetUserDto } from "./get-user.dto";

export class GetUserWithRoleDto extends GetUserDto {
  role: RoleNamesEnum;
}
