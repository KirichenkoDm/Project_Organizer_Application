import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { Roles } from "src/shared/roles.decorator";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

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
  ): Promise<BasicResponceDto> {
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
    @Param("id") id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<BasicResponceDto> {
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
    @Param("id") id: number,
  ): Promise<BasicResponceDto> {
    return await this.roleService.deleteRoleById(id);
  }

  //todo - delete own role with @SkipRoles()
}
