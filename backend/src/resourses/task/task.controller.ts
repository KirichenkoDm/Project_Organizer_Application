import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTaskDto } from "./dto/get-task-info-short.dto";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { Roles } from "src/shared/roles.decorator";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { ParseNumberPipe } from "src/shared/parse-number.pipe";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  /*
   gets id of project
   returns array of not archived tasks datas
 */
  @Get("/project/:id") 
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async getTasksByProjectId(
    @Param("id", ParseNumberPipe) projectId: number,
  ): Promise<GetTaskDto[]> {
    return await this.taskService.getTasksByProjectId(projectId);
  }

  /*
   gets id of project
   returns array of all tasks datas
 */
  @Get("/project/:id/archive")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async getTasksWithArchivedByProjectId(
    @Param("id", ParseNumberPipe) projectId: number,
  ): Promise<GetTaskDto[]> {
    return await this.taskService.getTasksWithArchivedByProjectId(projectId);
  }

  /*
    gets task data to create new task
    returns created task
  */
  @Post()
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GetTaskDto> {
    return await this.taskService.createTask(createTaskDto);
  }

  /*
    gets id of task and data to update it
    returns updated task
  */
  @Put(":id")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async updateTaskById(
    @Param("id", ParseNumberPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<GetTaskDto> {
    return await this.taskService.updateTaskById(id, updateTaskDto);
  }

  /*
      gets id and new order of task
      updates all records of affected tasks
      returns list of all tasks in column
  */
  @Put(":id/reorder/:neworder")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async reorderTaskById(
    @Param("id", ParseNumberPipe) id: number,
    @Param("neworder", ParseNumberPipe) newOrder: number,
  ): Promise<GetTaskDto[]> {
    return await this.taskService.reorderTaskById(id, newOrder);
  }

  /*
    gets id of task delete
    returns responce with success message
  */
  @Delete(":id")
  @Roles(
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async deleteTaskById(
    @Param("id", ParseNumberPipe) id: number
  ): Promise<BasicResponseDto> {
    return await this.taskService.deleteTaskById(id);
  }
}
