import { destroy, flow, types } from "mobx-state-tree";
import { User, UserInstance } from "./models/user";
import { Credentials } from "@/shared/types/credentials";
import { CreateUser } from "@/shared/types/create-user";
import { initialiseUser } from "./initialise-user";
import { useStore } from "./root-provider";
import axiosController from "./axios-controller";
import { EditUser } from "@/shared/types/edit-user";
import { destroyCookie } from "nookies";

export const UserStore = types
  .model("UserStore", {
    user: types.maybe(User),
  })
  .views(self => ({
    get isAuthenticated() {
      return self.user !== undefined;
    },
    get getUserData() {
      if(self.user) {
        return self.user;
      }
    }
  }))
  .actions((self) => {
    const actions = {
      setUser(user: UserInstance | null) {
        if (user) {
          self.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          destroy(self.user);
          destroyCookie(null, "accessToken");
          localStorage.removeItem("user");
        }
      },

      register: flow(function* (userData: CreateUser) {
        console.log("how?");
        const user = yield axiosController.register(userData);
        actions.setUser(initialiseUser(user));
      }),

      login: flow(function* (credentials: Credentials) {
        const userData = yield axiosController.login(credentials);
        actions.setUser(initialiseUser(userData));
      }),

      deleteUser: flow(function* () {
        const responce = yield axiosController.deleteUser(self.user!.id)
        actions.setUser(null)
      }),

      editUser: flow(function* (userData: EditUser) {
        const user = yield axiosController.updateUser(self.user!.id, userData)
        console.log(user);
        actions.setUser(user);
      })
    }
    return actions;
  })

export const useUserStore = () => {
  return useStore().userStore;
}
