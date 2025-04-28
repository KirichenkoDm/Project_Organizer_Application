import { Instance, types } from "mobx-state-tree";

export const CurrentUser = types.model("CurrentUser", {
  id: types.identifier,
  email: types.string,
  firstName: types.string,
  lastName: types.string
});

export type CurrentUserInstance = Instance<typeof CurrentUser>;