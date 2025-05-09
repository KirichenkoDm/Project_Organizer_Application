import { cast, flow, getRoot, types } from "mobx-state-tree";
import axios from "axios";
import { useStore } from "./root-provider";
import { HomeProjectListItem, HomeProjectListItemInstance } from "./models/home-project-list-item";
import AxiosController from "./axios-controller";
import { RootStoreInstance } from "./root-instance";
import { CreateProject } from "@/shared/types/create-project";

export const HomeProjectsStore = types
  .model("HomeProjectsStore", {
    homeProjects: types.maybe(types.array(HomeProjectListItem)),

  })
  .actions((self) => {
    const actions = {
      fetchHomeProjects: flow(function* (userId: number) {
        const projects = yield AxiosController.get<HomeProjectListItemInstance[]>(
          `/project/user/${userId}`,
          undefined,
          true
        );

        if (projects) {
          self.homeProjects
          ? self.homeProjects.replace(projects)
          : self.homeProjects = cast(projects);
        }
      }),

      createProject: flow(function* (projectData: CreateProject) {
        const project = yield AxiosController.post<HomeProjectListItemInstance>(
          "/project",
          projectData,
          true
        );
        if (!self.homeProjects) {
          self.homeProjects = cast([project]);
        } else {
          self.homeProjects.push(project);
        }
      }),
    };

    return actions;
  });

export const useHomeProjectsStore = () => {
  return useStore().homeProjectsStore;
}