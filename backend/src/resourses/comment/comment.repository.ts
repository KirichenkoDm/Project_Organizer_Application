import { DataSource, Repository } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {

  constructor(private dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }

  async findByTaskId(taskId: number, page: number): Promise<CommentEntity[]> {
    const limit = 15;
    const skip = (page - 1) * limit
    return this.find({
      where: {
        task: {
          id: taskId,
        }
      },
      order: { createdAt: "DESC" },
      take: limit,
      skip: skip,
    })
  }
}