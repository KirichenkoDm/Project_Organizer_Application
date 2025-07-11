import { DataSource, Repository } from "typeorm";
import { TaskEntity } from "./tasks.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {

  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async findOneWithRelations(id: number): Promise<TaskEntity> {
    return this.findOne({
      where: { id },
      relations: {
        project: true,
        user: true,
        column: true,
        task: true,
      }
    });
  }

  async findByProjectId(projectId: number): Promise<TaskEntity[]> {
    return this.find({
      where: {
        project: {
          id: projectId
        }
      },
      relations: {
        project: true,
        user: true,
        column: true,
        task: true,
      },
      order: { order: "ASC" },
    });
  }

  async findWithArchivedByProjectId(projectId: number): Promise<TaskEntity[]> {
    return this.createQueryBuilder("tasks")
      .withDeleted()
      .where("tasks.project_id = :projectId", { projectId })
      .orderBy("tasks.updated_at", "DESC")
      .getMany()
  }

  async findTasksByColumnId(columnId: number): Promise<TaskEntity[]> {
    return this.find({
      where: {
        column: {
          id: columnId
        }
      },
      relations: {
        project: true,
        user: true,
        column: true,
        task: true,
      },
      order: { order: "ASC" },
    })
  }
}
