import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, ValidateNested } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @IsObject()
  text: object;
}
