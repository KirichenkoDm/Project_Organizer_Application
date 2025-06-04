import { Instance, types } from "mobx-state-tree";
import { Column } from "./column";
import { Task } from "./task";
import { ProjectThemeEnum } from "@/shared/project-theme.enum";

export const Project = types.model("Project", {
  id: types.identifierNumber,
  name: types.string,
  theme: types.enumeration("ProjectTheme", Object.values(ProjectThemeEnum)),
  description: types.string,
  columns: types.array(Column),
  tasks: types.array(Task),
});

export type ProjectInstance = Instance<typeof Project>;