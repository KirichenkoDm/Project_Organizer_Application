import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { Delta } from "src/shared/delta";

export class UpdateCommentDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Delta)
  text: Delta;
}
