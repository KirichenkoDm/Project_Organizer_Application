import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";
import { IsObject } from "class-validator";

export class UpdateProjectDto extends PartialType(
  OmitType(CreateProjectDto, ["creatorId"]),
) {
  @IsObject()
  report?: object;
}
