import { ProjectThemeEnum } from "../project-theme.enum";

export class GetProjectDto {
  id: number;
  name: string;
  theme: ProjectThemeEnum;
  description: string;
}
