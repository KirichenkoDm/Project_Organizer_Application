import { Expose } from "class-transformer";
import { IsObject } from "class-validator";

export class UpdateCommentDto {
  @Expose()
  @IsObject()
  text: object;
}
