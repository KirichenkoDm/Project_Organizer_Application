import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";
import { Expose } from "class-transformer";

export class UpdateProjectDto extends PartialType(
  OmitType(CreateProjectDto, ["creatorId"]),
) {
  @Expose()
  report?: object;
}
