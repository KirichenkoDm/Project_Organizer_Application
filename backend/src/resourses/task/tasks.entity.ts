import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "../project";
import { ColumnEntity } from "../column";
import { UserEntity } from "../user";

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
  @JoinColumn({ name: "projectId" })
  project: ProjectEntity;

  @Column("int")
  @ManyToOne(() => ColumnEntity)
  @JoinColumn({ name: "columnId" })
  column: ColumnEntity;

  @Column({ type: "int", nullable: true })
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: "blockedBy" })
  task: TaskEntity;

  @Column({ type: "int", nullable: true })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "assignedId" })
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
