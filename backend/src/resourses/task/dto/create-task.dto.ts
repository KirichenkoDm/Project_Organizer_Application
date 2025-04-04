export class CreateTaskDto {
  name: string;
  description: string;
  order: number;
  projectId: number;
  columnId: number;
  start?: Date;
  end?: Date;
}
