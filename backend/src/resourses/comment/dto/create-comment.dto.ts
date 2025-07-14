import { Expose, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, ValidateNested } from "class-validator";

export class CreateCommentDto {
  @Expose()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @Expose()
  @IsObject()
  text: object;
}
