import { BadRequestException, Injectable } from "@nestjs/common";
import { ColumnRepository } from "./column.repository";
import { CreateColumnDto } from "./dto/create-column.dto";
import { GetColumnDto } from "./dto/get-column.dto";

const defaultColumnNames = [
  "To Do",
  "In Progress",
  "Finished"
]

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnRepository: ColumnRepository,
  ) { }

  async getColumnsByProjectId() {

  }

  async createColumn(columnData: CreateColumnDto): Promise<GetColumnDto> {
    const column = await this.columnRepository.save(columnData);

    if (!column) {
      throw new BadRequestException("Column was not created");
    }

    //todo: reorder columns pushed by created one
    return column;
  }

  //todo: return data refactor
  async createDefaultColumns(projectId: number): Promise<GetColumnDto[]> {
    return await Promise.all(defaultColumnNames.map((name, index) =>
      this.createColumn({
        projectId: projectId,
        name: name,
        order: index + 1,
        isCustom: false,
      })
    ));
  }
}
