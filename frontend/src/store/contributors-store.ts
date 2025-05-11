import { cast, flow, types } from "mobx-state-tree";
import { User } from "./models/user";
import { RoleNamesEnum } from "@/shared/role-names.enum";
import { useStore } from "./root-provider";
import { Contributor } from "./models/contributor";
import AxiosController from "./axios-controller";
import { GetContributor } from "@/shared/types/get-contributor";
import { ErrorMessage } from "formik";
import { CreateRole } from "@/shared/types/create-role";

export const ContributorsStore = types
  .model("ContributorsStore", {
    contributors: types.maybe(types.array(Contributor)),
    isLoading: types.boolean,
    errorMessage: types.maybeNull(types.string),
  })
  .views((self) => {
    const views = {
      get getContributors() {
        return self.contributors;
      },
    }
    return views
  })
  .actions((self) => {
    const actions = {
      setContributors(contributors: GetContributor[]) {
        self.contributors = cast(contributors);
      },

      loadContributors: flow(function* (projectId: Number) {
        self.isLoading = true;
        const contributors = yield AxiosController.get<GetContributor[]>(
          `/user/project/${projectId}`,
          { "currentProjectId": projectId },
          true
        );

        if (!contributors) {
          self.errorMessage = "Can't load the contrubutors, try again later"
          return;
        };

        self.errorMessage = null;
        self.isLoading = false;
        actions.setContributors(contributors);
      }),

      addContributor: flow(function* (contributorData: CreateRole, projectId: number) {
        const responce = yield AxiosController.post(
          "/role",
          { currentProjectId: projectId },
          contributorData,
          true
        );

        if (!responce.isSuccess) {
          self.errorMessage = "Contributor was not added, try again later";
        }
      })
    }
    return actions
  })

export const useContributorsStore = () => {
  return useStore().contributorsStore;
}