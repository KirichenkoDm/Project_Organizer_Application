import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { ProjectThemeEnum } from "../project-theme.enum";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProjectThemeEnum)
  theme: ProjectThemeEnum;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  creatorId: number;
}
