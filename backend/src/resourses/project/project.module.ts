import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { RoleModule } from "../role";
import { ColumnModule } from "../column";
import { ProjectEntity } from "./projects.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

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
