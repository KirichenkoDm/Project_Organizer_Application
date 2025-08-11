import { Injectable, } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {

  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
      }
    });
  }

  async findByEmailNotInProject(email: string, currentProjectId: number): Promise<UserEntity[]> {
    const emailquery = `%${email}%`
    
    const query = this.createQueryBuilder("user")
      .select([
        "user.id AS id",
        "user.email AS email",
        "user.first_name AS \"firstName\"",
        "user.last_name AS \"lastName\"",
      ])
      .where("user.email ILIKE :emailquery", { emailquery })
      .andWhere("user.archived_at IS NULL")
      .andWhere("NOT EXISTS (SELECT 1 FROM roles role WHERE role.user_id = user.id AND role.project_id = :projectId AND role.archived_at IS NULL)", 
      { projectId: currentProjectId })
      .limit(10);
    return await query.getRawMany();
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity> {
    return await this.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      }
    });
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<BasicResponseDto> {
    await this.save({
      id,
      refreshToken
    })
    return {
      message: "Refresh token set",
      status: 200,
      isSuccess: true,
    };
  }

  async checkAdmin(id: number) {
    return await this.findOne({
      where: { id },
      select: {
        email: true,
        isAdmin: true,
      }
    });
  }
}