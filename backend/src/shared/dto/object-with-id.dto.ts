import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class ObjectWithId {
  @Expose()
  @IsNotEmpty()
  @IsInt()
  id: number;
}