import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { Delta } from "src/shared/delta";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Delta)
  text: Delta;
}
