import { Injectable } from "@nestjs/common";
import { RoleEntity } from "./role.entity";
import { DataSource, Repository } from "typeorm";
import { GetUserWithRoleDto } from "../user";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async findUsersByProjectId(projectId: number): Promise<GetUserWithRoleDto[]> {
    const users = await this.createQueryBuilder("roles")
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

    return users as GetUserWithRoleDto[]
  }
}
