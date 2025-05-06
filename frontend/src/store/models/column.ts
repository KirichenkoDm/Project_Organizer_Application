import { Instance, types } from "mobx-state-tree";

export const Column = types.model("Column", {
  id: types.identifierNumber,
  name: types.string,
  order: types.number,
  isCustom: types.boolean,
});

export type ColumnInstance = Instance<typeof Column>;
