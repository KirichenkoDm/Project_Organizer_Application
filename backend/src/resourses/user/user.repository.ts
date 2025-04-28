import { Injectable, } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";

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
      }
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      }
    });
    
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

  async setRefreshToken(id: number, refreshToken: string): Promise<BasicResponceDto> {
    await this.save({
      id,
      refreshToken
    })
    return {
      message: "Refresh token set",
      isSuccess: true,
    };
  }
}