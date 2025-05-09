import { ProjectThemeEnum } from "../project-theme.enum";

export type EditProject = {
    name: string,
    description: string,
    theme: ProjectThemeEnum,
}