import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Response } from "express";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /*
     gets role data (project and user Ids plus role name) to create new relation
     returns responce with success/error message 
  */
  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of role and new role name
    returns responce with success/error message
  */
  @Put(":id")
  async updateRoleById(
    @Param("id") id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of role to delete
    returns responce with success/error message
  */
  @Delete(":id")
  async deleteRoleById(
    @Param("id") id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }
}
