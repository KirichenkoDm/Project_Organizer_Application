import { types } from "mobx-state-tree";
import { CurrentUser, CurrentUserInstance } from "./models/current-user";
import { CurrentProject, CurrentProjectInstance } from "./models/current-project";
import React from "react";

export const RootStore = types
  .model("RootStore", {
    currentUser: types.maybe(CurrentUser),
    currentProject: types.maybe(CurrentProject),
  })
  .actions((self) => ({
    setCurrentUser(user: CurrentUserInstance) {
      self.currentUser = user;
    },
    setCurrentProject(project: CurrentProjectInstance) {
      self.currentProject = project;
    },
  }));

export const rootStore = RootStore.create({
  //todo: setup here, search current user in local storage
});
