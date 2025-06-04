import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class CreateColumnDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  project: { id: number };

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsBoolean()
  isCustom: boolean;
}
