import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { Roles } from "src/shared/roles.decorator";
import { ParseNumberPipe } from "src/shared/parse-number.pipe";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  /*
    gets project and user IDs
    returns role neme of the user inside project
  */
  @Get("/user/:userId/project/:projectId")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner,
  )
  async getRole (
    @Param("userId", ParseNumberPipe) userId: number,
    @Param("projectId", ParseNumberPipe) projectId: number,
  ): Promise<RoleNamesEnum> {
    return await this.roleService.getRole(userId, projectId);
  }

  /*
     gets role data (project and user Ids plus role name) to create new relation
     returns responce with success message 
  */
  @Post()
  @Roles(
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<BasicResponseDto> {
    return await this.roleService.createRole(createRoleDto);
  }

  /*
    gets id of role and new role name
    returns responce with success message
  */
  @Put(":id")
  @Roles(
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async updateRoleById(
    @Param("id", ParseNumberPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<BasicResponseDto> {
    return await this.roleService.updateRoleById(id, updateRoleDto);
  }

  /*
    gets id of role to delete
    returns responce with success message
  */
  @Delete(":id")
  @Roles(
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async deleteRoleById(
    @Param("id", ParseNumberPipe) id: number,
  ): Promise<BasicResponseDto> {
    return await this.roleService.deleteRoleById(id);
  }
}
