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
      blockedBy: task.task.id,
      blockedByName: task.task.name,
      assignedId: task.user.id,
      start: task.start,
      end: task.end,
    }
  }
}