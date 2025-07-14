import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @Expose()
  @IsEmail({})
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30 )
  lastName: string;
}
