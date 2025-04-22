import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Password must not be empty" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @MaxLength(50, { message: "Password must be at most 50 characters long" })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "First name must not be empty" })
  @MinLength(3, { message: "First name must be at least 3 characters long" })
  @MaxLength(30, { message: "First name must be at most 30 characters long" })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: "Last name should not be empty" })
  @MinLength(3, { message: "Last name must be at least 3 characters long" })
  @MaxLength(30, { message: "Last name must be at most 30 characters long" })
  lastName: string;
}
