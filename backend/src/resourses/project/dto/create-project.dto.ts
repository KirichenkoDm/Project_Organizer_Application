import { ProjectThemeEnum } from "../project-theme.enum";

export class CreateProjectDto {
  name: string;
  theme: ProjectThemeEnum;
  description: string;
  creatorId: number;
}
