import { types, Instance } from "mobx-state-tree";
import { User } from "./models/user";
import { UserStore } from "./user-store";
import { ProjectStore } from "./project-store";
import { HomeProjectsStore } from "./home-projects-store";


export const RootStore = types
  .model("RootStore", {
    userStore: types.optional(UserStore, {}),
    projectStore: types.optional(ProjectStore, {}),
    homeProjectsStore: types.optional(HomeProjectsStore, {}),
  })
  .actions((self) => {
    const actions = {
      hydrate() {
        const userJson = localStorage.getItem("user");
        if (userJson) {
          try {
            const parsed = JSON.parse(userJson);
            const user = User.create(parsed);
            self.userStore.setUser(user);
          } catch (error) {
            console.error("Failed to parse or create User from localStorage: ", error);
            self.userStore.setUser(null);
          }
        }
      },
    };

    return actions;
  });

export const rootStore = RootStore.create({});