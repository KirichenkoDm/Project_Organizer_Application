import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from "@nestjs/common";
import { ColumnService } from "./column.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetColumnDto } from "./dto/get-column.dto";

@Controller("column")
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  /*
    gets id of project to find related columns
    returns array of columns id, name, isCustom and order
  */
  @Get("project/:id")
  async getColumnsByProjectId(
    @Param("id") projectId: number,
  ): Promise<GetColumnDto[]> {
    return;
  }

  /*
     gets column data to create new column
     returns created column data 
  */
  @Post()
  async createColumn(
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<GetColumnDto> {
    return;
  }

  /*
    gets id of column and data to update it
    returns updated column data
  */
  @Put(":id")
  async updateColumnById(
    @Param("id") id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<GetColumnDto> {
    return;
  }

  /*
    gets new order of column
    updates all records of affected columns
    returns responce with success message
  */
  @Put(":id/reorder/:neworder")
  async reorderColumnById(
    @Param("id") id: number,
    @Param("neworder") newOrder: number,
  ): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of column to delete
    returns responce with success message
  */
  @Delete(":id")
  async deleteColumnById(
    @Param("id") id: number,
  ): Promise<BasicResponceDto> {
    return;
  }
}
