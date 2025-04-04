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

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /*
    gets id of task to find
    returns task data
  */
  @Get(":id")
  async getTaskById(
    @Param("id") id: number,
  ): Promise<GetTaskDto> {
    return;
  }

  /*
   gets id of project
   returns array of tasks datas
 */
  @Get("/project/:id")
  async getTasksByProjectId(
    @Param("id") projectId: number,
  ): Promise<GetTaskDto[]> {
    return;
  }

  /*
   gets id of project
   returns array of archived tasks datas
 */
  @Get("/project/:id/archived")
  async getArchivedTasksByProjectId(
    @Param("id") projectId: number,
  ): Promise<GetTaskDto[]> {
    return;
  }

  /*
    gets task data to create new task
    returns created task data
  */
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GetTaskDto> {
    return;
  }

  /*
    gets id of task and data to update it
    returns updated task data
  */
  @Put(":id")
  async updateTaskById(
    @Param("id") id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<GetTaskDto> {
    return;
  }

  /*
    gets id of task delete
    returns responce with success message
  */
  @Delete(":id")
  async deleteTaskById(
    @Param("id") id: number
  ): Promise<BasicResponceDto> {
    return;
  }
}
