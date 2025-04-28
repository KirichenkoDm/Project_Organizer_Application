import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetTaskDto } from "./dto/get-task-info-short.dto";
import { TaskCore } from "./task.core";
import { TaskRepository } from "./task.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCore: TaskCore,
  ) { }

  async getTasksByProjectId(projectId: number): Promise<GetTaskDto[]> {
    const tasks = await this.taskRepository.findByProjectId(projectId);

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException("Tasks for this project not found");
    }

    return tasks.map(col => this.taskCore.mapperEntityToGetDTO(col))
  }

  async getTasksWithArchivedByProjectId(projectId: number): Promise<GetTaskDto[]> {
    const tasks = await this.taskRepository.findWithArchivedByProjectId(projectId);

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException("Tasks for this project not found");
    }

    return tasks.map(col => this.taskCore.mapperEntityToGetDTO(col))
  }

  async createTask(taskData: CreateTaskDto): Promise<GetTaskDto> {
    const task = await this.taskRepository.save(taskData);

    if (!task) {
      throw new BadRequestException("Task was not created");
    }

    await this.reorderTaskById(task.id, task.order);

    return task;
  }

  async updateTaskById(id: number, taskData: UpdateTaskDto): Promise<GetTaskDto> {
      const taskToUpdate = await this.taskRepository.findOneBy({ id });
      if (!taskToUpdate) {
        throw new NotFoundException("Task with this id not found");
      }
  
      const task = await this.taskRepository.save({
        ...taskToUpdate,
        ...taskData,
      });
  
      if (!task) {
        throw new BadRequestException("Task was not updated");
      }
  
      return this.taskCore.mapperEntityToGetDTO(task);
    }

  async reorderTaskById(id: number, newOrder: number): Promise<GetTaskDto[]> {
    const targetTask = await this.taskRepository.findOneBy({ id });
    if (!targetTask) {
      throw new NotFoundException("Task with this id not found");
    }

    const projectColumns = await this.taskRepository.getTasksByColumnId(targetTask.column.id);

    const filtered = projectColumns.filter(tsk => tsk.id !== id);
    filtered.splice(newOrder - 1, 0, targetTask);

    const reordered = await Promise.all(
      filtered.map((col, index) => {
        col.order = index + 1;
        return this.taskRepository.save(col);
      })
    );

    if (!reordered || reordered.some(col => !col)) {
      throw new InternalServerErrorException("Some tasks were not saved correctly");
    }

    return reordered.map(col => this.taskCore.mapperEntityToGetDTO(col))
  }

   async deleteTaskById(id: number): Promise<BasicResponseDto> {
      const taskToDelete = await this.taskRepository.findOneBy({ id });
  
      if (!taskToDelete) {
        throw new NotFoundException("Task with this id not found");
      }
  
      const result = await this.taskRepository.softDelete(id);
  
      if (result.affected === 0) {
        throw new BadRequestException("Task was not deleted");
      }
  
      return {
        message: "Task successsfully deleted",
        status: 204,
        isSuccess: true,
      }
    }
}
