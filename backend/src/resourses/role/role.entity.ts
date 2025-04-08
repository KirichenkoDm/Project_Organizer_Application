import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { RoleNamesEnum } from "./role-names.enum";
import { ProjectEntity } from "../project";
import { UserEntity } from "../user";

@Entity("roles")
@Unique(["project", "user"])
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("int")
  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @Column("int")
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({
    type: "enum",
    enum: RoleNamesEnum,
    default: RoleNamesEnum.Member,
  })
  role: RoleNamesEnum;

  @Column("timestamptz")
  createdAt: Date;

  @Column("timestamptz")
  updatedAt: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
    default: null,
  })
  archivedAt: Date;
}
