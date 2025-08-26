import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CredentialDto {
  @Expose()
  @IsNotEmpty()
  email: string;
  @Expose()
  @IsNotEmpty()
  password: string;
};
