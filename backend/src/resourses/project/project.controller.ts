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
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Response } from "express";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetProjectDto } from "./dto/get-project.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /*
    gets id of project to find
    returns found project name, theme and description
  */
  @Get(":id")
  async getProjectById(
    @Param("id") id: number,
    @Res() response: Response,
  ): Promise<GetProjectDto> {
    return;
  }

  /*
    gets id of user to find all related projects
    search relations in roles table and join project data
    returns array of project id, name, theme and description
  */
  @Get("/user/:id")
  async getProjectsByUserId(
    @Param("id") userId: number,
    @Res() response: Response,
  ): Promise<GetProjectDto[]> {
    return;
  }

  // getProjectReportById

  /*
      gets project data to create
      returns created project id, name, theme and description
    */
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Res() response: Response,
  ): Promise<GetProjectDto> {
    return;
  }

  /*
    gets id of project and data to update it
    returns updated project id, name, theme and description
  */
  @Put(":id")
  async updateProjectById(
    @Param("id") id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() response: Response,
  ): Promise<GetProjectDto> {
    return;
  }

  /*
    gets id of project to delete
    returns responce with success message
  */
  @Delete(":id")
  async deleteProjectById(
    @Param("id") id: number,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }
}
