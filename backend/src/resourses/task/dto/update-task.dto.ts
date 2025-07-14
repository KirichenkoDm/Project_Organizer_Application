import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsInt, IsObject, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { ObjectWithId } from "src/shared/dto/object-with-id.dto";

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, ["project", "order"]),
) {

  @Expose()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  user?: { id: number };

  @Expose()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ObjectWithId)
  task?: { id: number };
}
