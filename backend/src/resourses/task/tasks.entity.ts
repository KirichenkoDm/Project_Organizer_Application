import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProjectEntity } from "../project/projects.entity";
import { ColumnEntity } from "../column/columns.entity";
import { UserEntity } from "../user/user.entity";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column("int")
  order: number;

  @Column("int")
  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @Column("int")
  @ManyToOne(() => ColumnEntity)
  @JoinColumn({ name: "column_id" })
  column: ColumnEntity;

  @Column({ type: "int", nullable: true })
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: "blocked_by" })
  task: TaskEntity;

  @Column({ type: "int", nullable: true })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "assigned_id" })
  user: UserEntity;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  start: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  end: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "archived_at" })
  archivedAt: Date;
}
