import { Expose, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class CreateColumnDto {
  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  project: { id: number };

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  order: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isCustom: boolean;
}
