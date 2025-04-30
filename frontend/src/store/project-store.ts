import { types } from "mobx-state-tree";
import { Project } from "./models/project";
import axios from "axios";
import { useStore } from "./root-provider";

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
  })
  .actions((self) => {
    const actions = {

    };

    return actions;
  });

export const useProjectStore = () => {
  return useStore().projectStore;
}