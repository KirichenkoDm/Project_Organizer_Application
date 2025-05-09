import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, ["project", "order"]),
) {

  @IsOptional()
  @IsInt()
  @IsPositive()
  assignedId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  blockedBy?: number;
}
