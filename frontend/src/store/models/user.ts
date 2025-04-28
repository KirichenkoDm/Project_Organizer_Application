import { Instance, types } from "mobx-state-tree";

export const User = types.model("User", {
  id: types.identifier,
  email: types.string,
  firstName: types.string,
  lastName: types.string
});

export type UserInstance = Instance<typeof User>;