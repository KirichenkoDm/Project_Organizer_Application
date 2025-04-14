import { Injectable } from "@nestjs/common";
import { RoleEntity } from "./role.entity";
import { DataSource, Repository } from "typeorm";
import { GetUserWithRoleDto } from "../user";
import { RoleNamesEnum } from "../../shared/role-names.enum";
import { ProjectEntity } from "../project/projects.entity";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async findUsersByProjectId(projectId: number): Promise<GetUserWithRoleDto[]> {
    return await this.createQueryBuilder("roles")
      .leftJoin("roles.user", "user")
      .select([
        "user.id AS id",
        "user.email AS email",
        "user.first_name AS firstName",
        "user.last_name AS lastName",
        "roles.role AS role",
      ])
      .where("roles.project_id = :projectId", { projectId })
      .getRawMany();
  }

  async findProjectsByUserId(userId: number): Promise<ProjectEntity[]> {
    return await this.createQueryBuilder("roles")
      .leftJoin("roles.project", "project")
      .select([
        "project.id AS id",
        "project.name AS name",
        "project.theme AS theme",
        "project.description AS description",
      ])
      .where("roles.user_Id = :userId", { userId })
      .getRawMany();
  }

  async findRole(userId: number, projectId: number): Promise<RoleNamesEnum> {
    const role = await this.findOne({
      select: {
        role: true,
      }, 
      where: {
        user: {id: userId},
        project: {id: projectId}
      }
     })
     return role.role;
  }
}
