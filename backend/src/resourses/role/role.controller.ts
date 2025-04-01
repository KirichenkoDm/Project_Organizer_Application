import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Response } from 'express';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  /*
     gets role data (project and user Ids plus role) to create new relation
     returns responce with success/error message 
   */
  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @Res() response: Response,
  ) {

  }

  /*
    ???
    gets id of role and new role "name"
    returns responce with success/error message
  */
  @Patch(':id') // @Put(':id')
  async updateRoleById(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() response: Response,
  ) {

  }

  //archive

  /*
    gets ids of project and user
    returns user role in this project or error message
  */
  @Get('project/:projectId/user/:userId')
  async getRoleById(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
    @Res() response: Response,
  ) {
  
  }  
}
