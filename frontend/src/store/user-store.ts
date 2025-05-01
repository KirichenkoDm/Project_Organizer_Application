import { destroy, flow, types } from "mobx-state-tree";
import { User, UserInstance } from "./models/user";
import { Credentials } from "@/shared/types/credentials";
import { CreateUser } from "@/shared/types/create-user";
import { initialiseUser } from "./initialise-user";
import { useStore } from "./root-provider";
import axiosController from "./axios-controller";

export const UserStore = types
  .model("UserStore", {
    user: types.maybe(User),
  })
  .views(self => ({
    get isAuthenticated() {
      return self.user !== undefined;
    }
  }))
  .actions((self) => {
    const actions = {
      setUser(user: UserInstance | null) {
        if (user) {
          self.user = user;
          console.log(self.user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          destroy(self.user);
          localStorage.removeItem("user");
        }
      },

      register: flow(function* (userData: CreateUser) {
        const user = yield axiosController.register(userData);
        actions.setUser(initialiseUser(user));

      }),

      login: flow(function* (credentials: Credentials) {
        const userData = yield axiosController.login(credentials);
        actions.setUser(initialiseUser(userData));
      }),
    }
    return actions;
  })

export const useUserStore = () => {
  return useStore().userStore;
}
