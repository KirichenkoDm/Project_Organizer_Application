import { types, Instance, destroy, flow } from "mobx-state-tree";
import { User, UserInstance } from "./models/user";
import { Project } from "./models/project";
import React from "react";
import { Credentials } from "@/shared/types/credentials";
import { LoginResponse } from "@/shared/types/login-responce";

export const RootStore = types
  .model("RootStore", {
    user: types.maybe(User),
    project: types.maybe(Project),
    accessToken: types.maybeNull(types.string),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
  })
  .views(self => ({
    get isAuthenticated() {
      return self.user !== null;
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

      hydrate() {
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          try {
            const parsed = JSON.parse(userJson);
            const user = User.create(parsed);
            actions.setUser(user);
          } catch (error) {
            console.error("Failed to parse or create User from localStorage: ", error);
            actions.setUser(null);
          }
        }
      },

      login: flow(function* (credentials: Credentials) {
        self.loading = true;
        self.error = "";

        try {
          const response: LoginResponse = yield apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          });

          actions.setUser(/* todo: parse token */);

        } catch (error: any) {
          self.error = error.message || "Login failed";
        } finally {
          self.loading = false ;
        }
      }),
    };

    return actions;
  });

export type RootStoreInstance = Instance<typeof RootStore>;

export const rootStore = RootStore.create({
  // todo: setup here, search current user in local storage
});