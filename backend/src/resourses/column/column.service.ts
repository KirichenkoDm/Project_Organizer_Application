import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ColumnRepository } from "./column.repository";
import { CreateColumnDto } from "./dto/create-column.dto";
import { GetColumnDto } from "./dto/get-column.dto";
import { ColumnCore } from "./column.core";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { Reorder } from "src/shared/reorder";
import { ColumnEntity } from "./columns.entity";

const defaultColumnNames = [
  "To Do",
  "In Progress",
  "Finished"
]

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnRepository: ColumnRepository,
    private readonly columnCore: ColumnCore,
  ) { }

  async getColumnsByProjectId(projectId: number): Promise<GetColumnDto[]> {
    const columns = await this.columnRepository.findByProjectId(projectId);

    if (!columns || columns.length === 0) {
      throw new NotFoundException("Columns for this project not found");
    }

    return columns.map(col => this.columnCore.mapperEntityToGetDTO(col))
  }

  async createColumn(columnData: CreateColumnDto): Promise<GetColumnDto> {
    const column = await this.columnRepository.save(columnData);

    if (!column) {
      throw new BadRequestException("Column was not created");
    }

    return this.columnCore.mapperEntityToGetDTO(column);
  }

  async updateColumnById(id: number, columnData: UpdateColumnDto): Promise<GetColumnDto> {
    const columnToUpdate = await this.columnRepository.findOneBy({ id });
    if (!columnToUpdate) {
      throw new NotFoundException("Column with this id not found");
    }

    const column = await this.columnRepository.save({
      ...columnToUpdate,
      ...columnData,
    });

    if (!column) {
      throw new BadRequestException("Column was not updated");
    }

    return this.columnCore.mapperEntityToGetDTO(column);
  }

  async reorderColumnById(id: number, newOrder: number): Promise<GetColumnDto[]> { 
      const targetColumn = await this.columnRepository.findOneWithRelations(id);
      if (!targetColumn) {
        throw new NotFoundException("Column with this id not found");
      }
      if (!targetColumn.isCustom) {
        throw new BadRequestException("Default columns cannot be moved");
      }
      
      
      const projectColumns = await this.getColumnsByProjectId(targetColumn.project.id);
      
      
      const reordered = Reorder<GetColumnDto>(projectColumns, targetColumn, newOrder);
      
      if (!reordered) {
        throw new InternalServerErrorException("Columns were not reordered correctly");
      }
      
      this.columnRepository.save(reordered);
      
      return reordered;
  }

  async deleteColumnById(id: number): Promise<BasicResponseDto> {
    const columnToDelete = await this.columnRepository.findOneBy({ id });

    if (!columnToDelete) {
      throw new NotFoundException("Column with this id not found");
    }

    const result = await this.columnRepository.softDelete(id);

    if (result.affected === 0) {
      throw new BadRequestException("Column was not deleted");
    }

    return {
      message: "Column successsfully deleted",
      status: 204,
      isSuccess: true,
    }
  }
}
