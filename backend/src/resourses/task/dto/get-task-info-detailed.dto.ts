import { GetTaskInfoShortDto } from "./get-task-info-short.dto";

export class GetTaskInfoDetailedDto extends GetTaskInfoShortDto {
  blockedBy?: number;
  blockedByName?: string;
  assignedId?: number;
  start?: Date;
  end?: Date;
}
