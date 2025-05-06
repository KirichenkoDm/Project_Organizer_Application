export type GetTask = {
  id: number
  name: string;
  description: string;
  order: number;
  columnId: number;
  blockedBy?: number;
  blockedByName?: string;
  assignedId?: number;
  start?: Date;
  end?: Date;
}
