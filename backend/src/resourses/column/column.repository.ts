import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ColumnEntity } from "./columns.entity";

@Injectable()
export class ColumnRepository extends Repository<ColumnEntity> {

  constructor(private dataSource: DataSource) {
    super(ColumnEntity, dataSource.createEntityManager());
  }

  async findByProjectId(projectId: number): Promise<ColumnEntity[]> {
    return this.find({
      where: {
        project: {
          id: projectId
        }
      },
      select: {
        id: true,
        name: true,
        order: true,
        isCustom: true,
      },
      relations: {
        project: true
      },
      order: { order: "ASC" },
    })
  }
}