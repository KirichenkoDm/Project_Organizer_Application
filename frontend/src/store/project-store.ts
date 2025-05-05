import { flow, types } from "mobx-state-tree";
import { Project } from "./models/project";
import axios from "axios";
import { useStore } from "./root-provider";
import { CreateProject } from "@/shared/types/create-project";
import axiosController from "./axios-controller";

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
  })
  .actions((self) => {
    const actions = {
      createProject: flow(function* (projectData: CreateProject) {
        const project = yield axiosController.createProject(projectData);
        self.project = project;
      }),
    };

    return actions;
  });

export const useProjectStore = () => {
  return useStore().projectStore;
}