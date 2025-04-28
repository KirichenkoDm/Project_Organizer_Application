import { IsObject } from "class-validator";

export class UpdateCommentDto {
  @IsObject()
  text: object;
}
