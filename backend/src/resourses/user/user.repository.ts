import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { GetUserDto, GetUserWithPasswordDto } from "./dto/get-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto/update-user.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {

  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<GetUserDto> {
    const user = await this.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      }
    });
    if (!user) {
      throw new NotFoundException('User with this id not found');
    }
    return user as GetUserDto;
  }

  async findByEmail(email: string): Promise<GetUserDto> {
    const user = await this.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      }
    });
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    return user as GetUserDto;
  }

  async findByEmailWithPassword(email: string): Promise<GetUserWithPasswordDto> {
    const user = await this.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      }
    });

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    return user as GetUserWithPasswordDto;
  }

  async addNew(userData: CreateUserDto): Promise<GetUserDto> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const user = await this.save(userData);

    if (!user) {
      throw new Error("User was not created");
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    } as GetUserDto;
  }

  async updateById(id: number, userData: UpdateUserDto): Promise<GetUserDto> {
    if(userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const userToUpdate = await this.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException("User with this id not found");
    }

    const user = await this.save({
      ...userToUpdate,
      ...userData,
    });
  
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    } as GetUserDto;
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<BasicResponceDto> {
    await this.save({
      id,
      refreshToken
    })
    return {message: "Refresh token set"};
  }

  async deleteById(id: number): Promise<BasicResponceDto> {
    const userToUpdate = await this.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException("User with this id not found");
    }
    
    await this.softDelete(id);

    return {message: "User successsfully deleted"}
  } 
}