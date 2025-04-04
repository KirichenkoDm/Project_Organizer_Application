import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    const foundUser = await this.userRepository.findOne({
      where: {email}
    });
    if(!foundUser) {
      throw new NotFoundException("User with this email not found");
    }
    return foundUser;
  }

  async getUserWithPasswordByEmail(email:string): Promise<GetUserDto & {password: string}> {
    const foundUser = await this.userRepository.findOne({
      where: { email }
    });
  
    if(!foundUser) {
      throw new NotFoundException("User with this email not found");
    }

    //todo: class-transformer?
    return foundUser;
  }

  async createUser(userData: CreateUserDto): Promise<GetUserDto> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const createdUser = await this.userRepository.save(userData);
    if(!createdUser) {
      throw new Error("User was not created");
    }
    return createdUser;
  }
}
