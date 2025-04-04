import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateColumnDto } from "./create-column.dto";

export class UpdateColumnDto extends PartialType(
  OmitType(CreateColumnDto, ["projectId"]),
) {}
