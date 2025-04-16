import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { TaskEntity } from "../task/tasks.entity";

@Entity("comments")
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column("int")
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: "taskId" })
  task: TaskEntity;

  @Column({ type: "jsonb", default: () => "'{}'::jsonb" })
  text: object;

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
