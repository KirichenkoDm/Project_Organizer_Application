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
}