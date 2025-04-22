import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  order: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  projectId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  columnId: number;

  @IsOptional()
  @IsDateString()
  start?: Date;

  @IsOptional()
  @IsDateString()
  end?: Date;
}
