import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ProjectThemeEnum } from "../project-theme.enum";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEnum(ProjectThemeEnum)
  theme: ProjectThemeEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(70)
  description: string;

  @IsNotEmpty()
  @IsInt()
  creatorId: number;
}
