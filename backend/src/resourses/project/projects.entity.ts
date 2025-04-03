import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
    type: "varchar",
    length: 255,
    nullable: true,
  })
  report: string;

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
