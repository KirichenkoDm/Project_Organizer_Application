import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProjectEntity } from "./projects.entity";

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {

  constructor(private dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  async findReportById(id: number): Promise<object> {
    const project = await this.findOne({
      where: { id },
      select: {report: {}}
    });

    return project.report;
  }
}