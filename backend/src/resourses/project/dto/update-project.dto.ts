import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";
import { Delta } from "src/shared/delta";
import { IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateProjectDto extends PartialType(
  OmitType(CreateProjectDto, ["creatorId"]),
) {
  @IsObject()
  @ValidateNested()
  @Type(() => Delta)
  report?: Delta;
}
