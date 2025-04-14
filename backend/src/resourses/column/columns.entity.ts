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
import { ProjectEntity } from "../project/projects.entity";

@Entity("columns")
@Unique(["project", "columnName"])
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "project_id" })
  project: ProjectEntity;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column("int")
  order: number;

  @Column({ type: "boolean", name: "is_custom" })
  isCustom: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "archived_at" })
  archivedAt: Date;
}
