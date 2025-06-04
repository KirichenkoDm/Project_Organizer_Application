import { IsEnum, IsInt, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { RoleNamesEnum } from "../../../shared/role-names.enum";
import { Type } from "class-transformer";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  user: {id: number};
  
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  project: {id: number};

  @IsNotEmpty()
  @IsEnum(RoleNamesEnum)
  role: RoleNamesEnum;
}
