import { destroy, flow, types } from "mobx-state-tree";
import { User, UserInstance } from "./models/user";
import { BASIC_BACKEND_URL } from "@/shared/constants";
import { Credentials } from "@/shared/types/credentials";
import axios from "axios";
import { CreateUser } from "@/shared/types/create-user";
import { initialiseUser } from "./initialise-user";

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

        const response = yield axios.post(
          BASIC_BACKEND_URL + "/user",
          userData,
        );
        actions.setUser(initialiseUser(response.body));

      }),

      login: flow(function* (credentials: Credentials) {
        const response = yield axios.post(
          BASIC_BACKEND_URL + "/auth/login",
          credentials,
        );
        actions.setUser(initialiseUser(response.data));
      }),
    }
    return actions;
  })
