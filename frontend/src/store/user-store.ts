import { destroy, flow, types } from "mobx-state-tree";
import { User, UserInstance } from "./models/user";
import { jwtDecode } from "jwt-decode";
import { BASIC_BACKEND_URL } from "@/shared/constants";
import { Credentials } from "@/shared/types/credentials";
import axios from "axios";
import { setCookie } from "nookies";

const ONE_HOUR = 60*60;

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
          localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          destroy(self.user);
          localStorage.removeItem("currentUser");
        }
      },

      login: flow(function* (credentials: Credentials) {
        try {
          const response = yield axios.post(
            BASIC_BACKEND_URL + "/auth/login", {
              body: JSON.stringify(credentials),
            }
          );

          const { accessToken } = response.data;

          setCookie(null, "accessToken", accessToken, {
            maxAge: ONE_HOUR, 
            path: "/",
          });


          const payload = jwtDecode<AccessTokenPayload>(accessToken)

          const user = User.create({
            id: payload.sub,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
          });

          actions.setUser(user);

        } catch (error) {
          
        } finally {
          
        }
      }),
    }
    return actions;
  })
