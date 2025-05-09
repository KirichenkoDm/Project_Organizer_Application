import { GetTaskDto } from "./dto/get-task-info-short.dto";
import { TaskEntity } from "./tasks.entity";

export class TaskCore {
  mapperEntityToGetDTO(task: TaskEntity): GetTaskDto {
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      order: task.order,
      columnId: task.column.id,
      blockedBy: task.task?.id ?? undefined,
      blockedByName: task.task?.name ?? undefined,
      assignedId: task.user?.id ?? undefined,
      start: task.start,
      end: task.end,
    }
  }
}