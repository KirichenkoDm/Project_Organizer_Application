import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  project: { id: number };

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  column: { id: number };

  @IsOptional()
  @IsDateString()
  start?: Date;

  @IsOptional()
  @IsDateString()
  end?: Date;
}
