import { Instance, types } from "mobx-state-tree";
import { User } from "./user";
import { RoleNamesEnum } from "@/shared/role-names.enum";

export const Contributor = User.props({
  role: types.maybe(types.enumeration("RoleNames", Object.values(RoleNamesEnum))),
});

export type ContributorInstance = Instance<typeof Contributor>;