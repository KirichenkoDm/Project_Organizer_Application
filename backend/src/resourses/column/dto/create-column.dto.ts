import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateColumnDto {
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsBoolean()
  isCustom: boolean;
}
