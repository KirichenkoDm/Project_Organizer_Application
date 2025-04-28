import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { RoleNamesEnum } from "../../shared/role-names.enum";
import { ProjectEntity } from "../project/projects.entity";
import { UserEntity } from "../user/user.entity";

@Entity("roles")
@Unique(["project", "user"])
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "archived_at"})
  archivedAt: Date;
}
