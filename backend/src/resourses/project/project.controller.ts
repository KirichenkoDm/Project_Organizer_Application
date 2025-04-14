import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetProjectDto } from "./dto/get-project.dto";
import { Roles, SkipRoles } from "src/shared/roles.decorator";
import { RoleNamesEnum } from "src/shared";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /*
    gets id of project to find
    returns found project name, theme and description
  */
  @Get(":id")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async getProjectById(
    @Param("id") id: number,
  ): Promise<GetProjectDto> {
    return await this.projectService.getProjectById(id);
  }

  /*
    gets id of user to find all related projects
    search relations in roles table and join project data
    returns array of project id, name, theme and description
  */
  @Get("/user/:id")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async getProjectsByUserId(
    @Param("id") userId: number,
  ): Promise<GetProjectDto[]> {
    return await this.projectService.getProjectsByUserId(userId);
  }

  @Get(":id/report")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async getProjectReportById(
    @Param("id") id: number,
  ): Promise<object> {
    return await this.projectService.getProjectReportById(id);
  }

  /*
      gets project data to create
      returns created project id, name, theme and description
  */
  @Post()
  @SkipRoles()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<GetProjectDto> {
    return await this.projectService.createProject(createProjectDto);
  }

  /*
    gets id of project and data to update it
    returns updated project id, name, theme and description
  */
  @Put(":id")
  @Roles(
    RoleNamesEnum.Owner
  )
  async updateProjectById(
    @Param("id") id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<GetProjectDto> {
    return await this.projectService.updateProjectById(id, updateProjectDto);
  }

  /*
    gets id of project to delete
    returns responce with success message
  */
  @Delete(":id")
  @Roles(
    RoleNamesEnum.Owner
  )
  async deleteProjectById(
    @Param("id") id: number,
  ): Promise<BasicResponceDto> {
    return await this.projectService.deleteProjectById(id);
  }
}
