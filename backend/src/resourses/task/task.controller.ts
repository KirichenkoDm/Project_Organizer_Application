import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }


  /*
    gets task data to create new task
    returns responce with success/error message 
  */
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of task and data to update it
    returns responce with success/error message
  */
  @Patch(':id') // @Put(':id')
  async updateTaskById(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() response: Response,
  ) {

  }

  //archive

  /*
    gets id of task to find
    returns found task data or error message
  */
  @Get(':id')
  async getTaskById(
    @Param('id') id: number,
    @Res() response: Response,
  ) {

  }

  /*
   gets id of column
   returns array of tasks id, name and description or error message
 */
  @Get('/column/:id')
  async getTasksByColumnId(
    @Param('id') columnId: number,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of project to find all related tasks (archived)
    returns array of tasks id and name or error message
  */
  @Get('/project/:id')
  async getArchivedTasksByProjectId(
    @Param('id') projectId: number,
    @Res() response: Response,
  ) {

  }
}
