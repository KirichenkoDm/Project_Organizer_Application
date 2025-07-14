import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ProjectThemeEnum } from "../project-theme.enum";
import { Expose } from "class-transformer";

export class CreateProjectDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(ProjectThemeEnum)
  theme: ProjectThemeEnum;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(70)
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  creatorId: number;
}
