import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Query } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetTaskInfoDetailedDto } from "./dto/get-task-info-detailed.dto";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /*
    gets id of task to find
    returns detailed data of task or error message
  */
  @Get(":id")
  async getTaskById(@Param("id") id: number): Promise<GetTaskInfoDetailedDto | BasicResponceDto> {
    return;
  }

  /*
   gets id of project
   returns array of tasks id, name, description and order or error message
 */
  @Get("/project/:id")
  async getTasksByProjectId(
    @Param("id") projectId: number,
    @Query("isArchived") isArchived: boolean,
  ): Promise<GetTaskInfoDetailedDto[] | BasicResponceDto> {
    return;
  }

  /*
    gets task data to create new task
    returns responce with success/error message 
  */
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of task and data to update it
    returns responce with success/error message
  */
  @Put(":id")
  async updateTaskById(@Param("id") id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of task delete
    returns responce with success/error message
  */
  @Delete(":id")
  async deleteTaskById(@Param("id") id: number): Promise<BasicResponceDto> {
    return;
  }
}
