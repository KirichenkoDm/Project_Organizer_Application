import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, ["projectId", "order"]),
) {
  assignedId?: number;
  blockedBy?: number;
}
