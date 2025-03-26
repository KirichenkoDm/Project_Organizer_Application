import "reflect-metadata"
import { ColumnEntity, CommentEntity, ProjectEntity, RoleEntity, TaskEntity, UserEntity } from "../Entities"
import { DataSource } from "typeorm"
import { RenamingDatabaseColumns1742990873704 } from "./Migrations/1742990873704-RenamingDatabaseColumns"

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
  migrations: [RenamingDatabaseColumns1742990873704],
  subscribers: [],
})