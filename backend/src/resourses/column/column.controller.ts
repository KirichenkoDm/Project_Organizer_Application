import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Response } from 'express';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) { }

  /*
     gets column data to create new column
     returns responce with success/error message 
   */
  @Post()
  async createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of column and data to update it
    reorder?
    returns responce with success/error message
  */
  @Patch(':id') // @Put(':id')
  async updateColumnById(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
    @Res() response: Response,
  ) {

  }

  //archive

  /*
    gets id of project to find related columns
    returns array of columns id, name, isCustom and order or error message
  */
  @Get('project/:id')
  async getColumnsByProjectId(
    @Param('id') projectId: number,
    @Res() response: Response,
  ) {

  }
}
