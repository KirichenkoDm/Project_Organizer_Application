import { ProjectThemeEnum } from "../project-theme.enum";

export type CreateProject = {
  name: string;
  theme: ProjectThemeEnum;
  description: string;
  creatorId: number;
}
