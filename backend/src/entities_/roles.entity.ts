import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ProjectEntity, UserEntity } from ".";
import { ERoles } from "../enums_";

@Entity("roles")
@Unique(["project", "user"])  
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: "projectId" })
  project: ProjectEntity;

  @Column("uuid")
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({
    type: "enum",
    enum: ERoles,
    default: ERoles.Member
  })
  role: ERoles;

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
