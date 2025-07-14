import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ name: "first_name", type: "varchar", length: 255 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 255 })
  lastName: string;

  @Column({
    name: "refresh_token", 
    type: "varchar", 
    length: 225, 
    nullable: true
  })
  refreshToken: string;

  @Column({ type: "boolean", name: "is_admin" })
  isCustom: boolean;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "archived_at"})
  archivedAt: Date;
}
