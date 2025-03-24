import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity, UserEntity } from ".";

@Entity("comments")
export class CommentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column("uuid")
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: "taskId" })
  task: TaskEntity;

  @Column({ type: "jsonb", default: () => "'{}'::jsonb" })
  text: object;  // или тип any, если требуется

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
