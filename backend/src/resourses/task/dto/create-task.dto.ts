import { Expose, Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class CreateTaskDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  project: { id: number };

  @Expose()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  column: { id: number };

  @Expose()
  @IsOptional()
  @IsDateString()
  start?: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  end?: Date;
}
