export type CreateTask = {
  name: string;
  description: string;
  order: number;
  project: {id: number};
  column: {id: number};
  start?: Date;
  end?: Date;
}
