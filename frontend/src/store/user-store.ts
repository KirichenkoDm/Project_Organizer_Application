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
import { RoleNamesEnum } from "@/shared/role-names.enum";
import { GetUser } from "@/shared/types/get-user";

const rolePriorityMap = {
  [RoleNamesEnum.Member]: 0,
  [RoleNamesEnum.ProjectManager]: 1,
  [RoleNamesEnum.Owner]: 2,
  [RoleNamesEnum.admin]: 100,
};

export const UserStore = types
  .model("UserStore", {
    user: types.maybe(User),
    role: types.maybe(types.enumeration("RoleNames", Object.values(RoleNamesEnum))),
    assigned: types.maybe(User),
    errorMessage: types.maybe(types.string)
  })
  .views(self => ({
    get isAuthenticated() {
      return self.user !== undefined;
    },

    get isAdmin() {
      return self.user?.isAdmin === true;
    },

    get getUserData() {
      if (self.user) {
        return self.user;
      }
    },

    get getRolePriority() {
      if(self.role && rolePriorityMap[self.role] !== undefined) {
        return rolePriorityMap[self.role];
      }
      return -1;
    },

    get getAssigned() {
      if (self.assigned) {
        return self.assigned;
      }
    }
  }))
  .actions((self) => {
    const actions = {
      setError(errorMessage: string | undefined) {
        self.errorMessage = errorMessage;
      },

      setUser(user: UserInstance) {
        self.user = user;
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      },

      setRole(role: RoleNamesEnum) {
        self.role = role;
      },

      setAssigned(assigned: UserInstance | undefined) {
        self.assigned = assigned;
      },

      logout() {
        AxiosController.post<void>(
          `/auth/logout/${self.user?.id}`,
          undefined,
          true
        );
        destroyCookie(null, COOKIE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        destroy(self.user);
      },

      register: flow(function* (userData: CreateUser) {
        const user = yield AxiosController.post<AccessTokenBody>(
          "/user",
          undefined,
          userData,
          false
        );
        actions.setUser(initialiseUser(user));
      }),

      login: flow(function* (credentials: Credentials) {
        const userData = yield AxiosController.post<AccessTokenBody>(
          "/auth/login/",
          undefined,
          credentials,
          false
        );

        if (!userData) {
          actions.setError("Invalid credentials");
          return;
        }
        actions.setUser(initialiseUser(userData));
      }),

      deleteUser: flow(function* () {
        const responce = yield AxiosController.delete(
          `/user/${self.user?.id}`,
          undefined,
          true
        )
        actions.logout()
      }),

      editUser: flow(function* (userData: EditUser) {
        const user = yield AxiosController.put<UserInstance>(
          `/user/${self.user?.id}`,
          undefined,
          userData,
          true
        );
        actions.setUser(user);
      }),

      refresh: flow(function* () {
        const user = yield AxiosController.sendRefresh()
        if (!user) return;
        actions.setUser(initialiseUser(user));
      }),

      fetchRole: flow(function* (projectId: number) {
        const role = yield AxiosController.get<RoleNamesEnum>(
          `/role/user/${self.user?.id}/project/${projectId}`,
          { "currentProjectId": projectId },
          true,
        )
        if (!role) return;
        actions.setRole(role)
      }),

      fetchAssigned: flow(function* (userId: number) {
        const user = yield AxiosController.get<UserInstance>(
          `/user/${userId}`,
          undefined,
          true
        );
        actions.setAssigned(user);
      }),

      fetchUsersByEmail: flow(function* (emailQuery: string, projectId: number) {
        const users = yield AxiosController.get<GetUser[]>(
          `/user/search`,
          {
            email: emailQuery,
            currentProjectId: projectId,
          },
          true,
        );

        if (!users) return []

        return users;
      }),
    }
    return actions;
  })

export const useUserStore = () => {
  return useStore().userStore;
}
