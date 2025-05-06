import { destroy, flow, types } from "mobx-state-tree";
import { User, UserInstance } from "./models/user";
import { Credentials } from "@/shared/types/credentials";
import { CreateUser } from "@/shared/types/create-user";
import { initialiseUser } from "./initialise-user";
import { useStore } from "./root-provider";
import AxiosController from "./axios-controller";
import { EditUser } from "@/shared/types/edit-user";
import { destroyCookie } from "nookies";
import { COOKIE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_USER_KEY } from "@/shared/constants";
import { AccessTokenBody } from "@/shared/types/access-token";

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
      setUser(user: UserInstance) {
          self.user = user;
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      },

      logout() {
        destroyCookie(null, COOKIE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        destroy(self.user);
      },

      register: flow(function* (userData: CreateUser) {
        const user = yield AxiosController.post<AccessTokenBody>(
          "/user",
          userData,
          false
        );
        actions.setUser(initialiseUser(user));
      }),

      login: flow(function* (credentials: Credentials) {
        const userData = yield AxiosController.post<AccessTokenBody>(
          "/auth/login/",
          credentials,
          false
        );
        actions.setUser(initialiseUser(userData));
      }),

      deleteUser: flow(function* () {
        const responce = yield AxiosController.delete(
          `/user/${self.user?.id}`,
          true
        )
        actions.logout()
      }),

      editUser: flow(function* (userData: EditUser) {
        const user = yield AxiosController.put<UserInstance>(
          `/user/${self.user?.id}`,
          userData,
          true
        );
        actions.setUser(user);
      }),

      refresh: flow(function* () {
        const user = yield AxiosController.sendRefresh()
        actions.setUser(initialiseUser(user));
      }),
    }
    return actions;
  })

export const useUserStore = () => {
  return useStore().userStore;
}
