import { Type } from "class-transformer";
import { IsArray, IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class Delta {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Operation)
  ops: Operation[];
}

class Operation {
  @IsOptional()
  @IsObject()
  insert?: string | object;

  @IsOptional()
  @IsInt()
  delete?: number;

  @IsOptional()
  @IsInt()
  retain?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuillAttributes)
  attributes?: QuillAttributes
}

class QuillAttributes {
  @IsOptional()
  @IsString()
  bold?: string;

  @IsOptional()
  @IsString()
  italic?: string;

  @IsOptional()
  @IsString()
  underline?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  link?: string;

}
