import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { ProjectEntity } from "./projects.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "../role/role.module";
import { ColumnModule } from "../column/column.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    RoleModule,
    ColumnModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule { }
