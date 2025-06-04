import { ColumnEntity } from "./columns.entity";
import { GetColumnDto } from "./dto/get-column.dto";


export class ColumnCore {
  mapperEntityToGetDTO(column: ColumnEntity): GetColumnDto {
    return {
      id: column.id,
      name: column.name,
      order: column.order,
      isCustom: column.isCustom,
    } as GetColumnDto;
  }
}