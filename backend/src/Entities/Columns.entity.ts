import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ProjectEntity } from ".";

@Entity("columns")
@Unique(["project", "columnName"])  
export class ColumnEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "projectId" })
  project: ProjectEntity;

  @Column({ type: "varchar", length: 255}) 
  columnName: string;

  @Column("int")
  order: number;

  @Column("boolean")
  isCustom: boolean;

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
