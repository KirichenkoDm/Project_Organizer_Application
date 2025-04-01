import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  /*
      gets project data to create
      returns responce with success/error message 
    */
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of project and data to update it
    returns responce with success/error message
  */
  @Patch(':id') // @Put(':id')
  async updateProjectById(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() response: Response,
  ) {

  }

  //archive

  /*
    gets id of project to find
    returns found project name, theme and description or error message
  */
  @Get(':id')
  async getProjectById(
    @Param('id') id: number,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of user to find all related projects
    search relations in roles table and join project data
    returns array of project id, name and description or error message
  */
  @Get('/user/:id')
  async getProjectsOfUser(
    @Param('id') userId: number,
    @Res() response: Response,
  ) {

  }
}
