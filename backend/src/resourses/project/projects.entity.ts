import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EProjectTheme } from "./project_theme.enum";

@Entity("projects")
export class ProjectEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ 
    type: "varchar", 
    length: 255, 
    unique: true 
  })
  name: string;

  @Column({
    type: "enum",
    enum: EProjectTheme,
    default: EProjectTheme.ComputerScience
  })
  theme: EProjectTheme;

  @Column({ type: "varchar", length: 255})
  description: string;

  @Column({ 
    type: "varchar", 
    length: 255, 
    nullable: true 
  })
  report: string;

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
