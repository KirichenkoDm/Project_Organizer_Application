import { ProjectThemeEnum } from "../project-theme.enum";

export type GetProject = {
  id: number;
  name: string;
  theme: ProjectThemeEnum;
  description: string;
}