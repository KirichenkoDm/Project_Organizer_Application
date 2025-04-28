import { types } from "mobx-state-tree";
import { Project } from "./models/project";

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
  })

