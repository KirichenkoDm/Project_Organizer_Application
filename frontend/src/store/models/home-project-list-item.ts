import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import { Instance, types } from "mobx-state-tree";

export const HomeProjectListItem = types.model("Project", {
  id: types.identifierNumber,
  name: types.string,
  theme: types.enumeration("ProjectTheme", Object.values(ProjectThemeEnum)),
  description: types.string,
});

export type HomeProjectListItemInstance = Instance<typeof HomeProjectListItem>;