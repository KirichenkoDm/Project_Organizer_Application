import { ProjectThemeEnum } from "../project-theme.enum";

export type Project = {
  id: number;
  name: string;
  theme: ProjectThemeEnum;
  description: string;
}
