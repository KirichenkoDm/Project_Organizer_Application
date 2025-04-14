import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectThemeEnum } from "./project-theme.enum";

@Entity("projects")
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: "enum",
    enum: ProjectThemeEnum,
    default: ProjectThemeEnum.ComputerScience,
  })
  theme: ProjectThemeEnum;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({
    type: "jsonb",
    default: () => "'{}'::jsonb",
    nullable: true
  })
  report: object;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "archived_at" })
  archivedAt: Date;
}
