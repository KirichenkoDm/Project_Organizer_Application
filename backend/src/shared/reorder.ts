import { GetColumnDto } from "src/resourses/column/dto/get-column.dto";
import { TaskEntity } from "src/resourses/task/tasks.entity";

export function Reorder<T extends GetColumnDto | TaskEntity>(
    list: T[], 
    target: T, 
    newOrder: number
  ): T[] {
  const filtered = list.filter(li => li.id !== target.id);
  filtered.splice(newOrder - 1, 0, target);

  return filtered.map((li, index) => {
    li.order = index + 1;
    return li;
  });
}