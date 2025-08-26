import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { ProjectEntity } from "./projects.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "../role/role.module";
import { ColumnModule } from "../column/column.module";
import { ProjectCore } from "./project.core";
import { ProjectGateway } from "./project-notification.gateway";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    RoleModule,
    ColumnModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ProjectCore, ProjectGateway],
})
export class ProjectModule { }
