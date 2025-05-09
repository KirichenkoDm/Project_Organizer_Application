import { types } from "mobx-state-tree";
import { User } from "./models/user";
import { UserStore } from "./user-store";
import { ProjectStore } from "./project-store";
import { HomeProjectsStore } from "./home-projects-store";
import { LOCAL_STORAGE_USER_KEY } from "@/shared/constants";


export const RootStore = types
  .model("RootStore", {
    userStore: types.optional(UserStore, {}),
    projectStore: types.optional(ProjectStore, {}),
    homeProjectsStore: types.optional(HomeProjectsStore, {}),
    error: types.maybeNull(types.string)
  })
  .views(self => ({
    get getError() {
      return self.error;
    },
  }))
  .actions((self) => {
    const actions = {
      hydrate() {
        const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (userJson) {
          try {
            const parsed = JSON.parse(userJson);
            const user = User.create(parsed);
            self.userStore.setUser(user);
          } catch (error) {
            console.error("Failed to parse or create User from localStorage: ", error);
            self.userStore.logout();
          }
        } else {
          self.userStore.refresh()
        }
      },
    };

    return actions;
  });

export const rootStore = RootStore.create({});