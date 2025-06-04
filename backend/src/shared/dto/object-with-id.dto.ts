import { IsInt, IsNotEmpty } from "class-validator";

export class ObjectWithId {
  @IsNotEmpty()
  @IsInt()
  id: number;
}