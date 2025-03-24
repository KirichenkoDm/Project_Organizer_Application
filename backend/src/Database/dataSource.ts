import "reflect-metadata"
import { ColumnEntity, CommentEntity, ProjectEntity, RoleEntity, TaskEntity, UserEntity } from "../Entities"
import { DataSource } from "typeorm"
import { InitialCreation1742833962934 } from "./Migrations/1742833962934-InitialCreation"
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "156324789",
  database: "project_organizer_application",
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    ProjectEntity,
    RoleEntity,
    ColumnEntity,
    TaskEntity,
    CommentEntity
  ],
  migrations: [InitialCreation1742833962934],
  subscribers: [],
})