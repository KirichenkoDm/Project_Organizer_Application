import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TaskEntity } from "./tasks.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { TaskCore } from "./task.core";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, TaskCore],
})
export class TaskModule { }
