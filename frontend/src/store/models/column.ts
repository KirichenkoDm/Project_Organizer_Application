import { types } from "mobx-state-tree";

export const Column = types.model("Column", {
  id: types.identifierNumber,
  columnName: types.string,
  order: types.number,
  isCustom: types.boolean,
});
