import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from "@nestjs/common";
import { ColumnService } from "./column.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { Response } from "express";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetColumnDto } from "./dto/get-column.dto";

@Controller("column")
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  /*
    gets id of project to find related columns
    returns array of columns id, name, isCustom and order or error message
  */
  @Get("project/:id")
  async getColumnsByProjectId(
    @Param("id") projectId: number,
    @Res() response: Response,
  ): Promise<GetColumnDto[] | BasicResponceDto> {
    return;
  }

  /*
     gets column data to create new column
     returns responce with success/error message 
   */
  @Post()
  async createColumn(@Body() createColumnDto: CreateColumnDto, @Res() response: Response): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of column and data to update it
    returns responce with success/error message
  */
  @Put(":id")
  async updateColumnById(
    @Param("id") id: number,
    @Body() updateColumnDto: UpdateColumnDto,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets new order of column
    updates all records of affected columns
    returns responce with success/error message
  */
  @Put(":id/reorder/:neworder")
  async reorderColumnById(
    @Param("id") id: number,
    @Param("neworder") newOrder: number,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of column to delete
    returns responce with success/error message
  */
  @Delete(":id")
  async deleteColumnById(
    @Param("id") id: number,
    @Body() updateColumnDto: UpdateColumnDto,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }
}
