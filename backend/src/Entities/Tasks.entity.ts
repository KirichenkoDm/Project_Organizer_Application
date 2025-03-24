import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ColumnEntity, ProjectEntity, UserEntity } from ".";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255})
  name: string;

  @Column({ type: "varchar", length: 255})
  description: string;

  @Column("uuid")
  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "projectId" })
  project: ProjectEntity;

  @Column("uuid")
  @ManyToOne(() => ColumnEntity)
  @JoinColumn({ name: "columnId" })
  column: ColumnEntity;

  @Column({ type: "uuid", nullable: true })
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: "blockedBy" })
  task: TaskEntity;

  @Column({ type: "uuid", nullable: true })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "assignedId" })
  user: UserEntity;

  @Column({ 
    type: "timestamptz", 
    nullable: true
  })
  start: Date;

  @Column({ 
    type: "timestamptz", 
    nullable: true
  })
  end: Date;

  @Column("timestamptz")
  createdAt: Date;

  @Column("timestamptz")
  updatedAt: Date;

  @Column({ 
    type: "timestamptz", 
    nullable: true, 
    default: null
  })
  archivedAt: Date;
};
