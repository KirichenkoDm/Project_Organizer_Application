import { types } from "mobx-state-tree";

export const Task = types.model("Task", {
  id: types.identifierNumber,
  name: types.string,
  description: types.string,
  order: types.number,
  columnId: types.number,
  blockedBy: types.maybe(types.number),
  blockedByName: types.maybe(types.string),
  assignedId: types.maybe(types.number),
  start: types.maybeNull(types.Date),
  end: types.maybeNull(types.Date),
});
