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
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetTaskDto } from "./dto/get-task-info-short.dto";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { Roles } from "src/shared/roles.decorator";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  /*
   gets id of project
   returns array of not archived tasks datas
 */
  @Get("/project/:id")
  async getTasksByProjectId(
    @Param("id") projectId: number,
  ): Promise<GetTaskDto[]> {
    return await this.taskService.getTasksByProjectId(projectId);
  }

  /*
   gets id of project
   returns array of all tasks datas
 */
  @Get("/project/:id/archive")
  async getTasksWithArchivedByProjectId(
    @Param("id") projectId: number,
  ): Promise<GetTaskDto[]> {
    return await this.taskService.getTasksWithArchivedByProjectId(projectId);
  }

  /*
    gets task data to create new task
    returns created task
  */
  @Post()
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
  async updateTaskById(
    @Param("id") id: number,
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
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async reorderTaskById(
    @Param("id") id: number,
    @Param("neworder") newOrder: number,
  ): Promise<GetTaskDto[]> {
    return await this.taskService.reorderTaskById(id, newOrder);
  }

  /*
    gets id of task delete
    returns responce with success message
  */
  @Delete(":id")
  async deleteTaskById(
    @Param("id") id: number
  ): Promise<BasicResponceDto> {
    return await this.taskService.deleteTaskById(id);
  }
}
