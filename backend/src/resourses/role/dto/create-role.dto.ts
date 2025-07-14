import { IsEnum, IsInt, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { RoleNamesEnum } from "../../../shared/role-names.enum";
import { Expose, Type } from "class-transformer";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class CreateRoleDto {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  user: {id: number};
  
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  project: {id: number};

  @Expose()
  @IsNotEmpty()
  @IsEnum(RoleNamesEnum)
  role: RoleNamesEnum;
}
