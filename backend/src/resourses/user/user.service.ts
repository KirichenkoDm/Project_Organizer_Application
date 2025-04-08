import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto, GetUserWithPasswordDto, GetUserWithRoleDto } from "./dto/get-user.dto";
import { UserRepository } from "./user.repository";
import { RoleRepository } from "../role";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) { }

  async getUserById(id: number): Promise<GetUserDto> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    return await this.userRepository.findByEmail(email);
  }

  async getUserWithPasswordByEmail(email:string): Promise<GetUserDto & {password: string}> {
    return await this.userRepository.findByEmailWithPassword(email);
  }

  async getUsersByProjectId(projectId: number): Promise<GetUserWithRoleDto[]> {
    return await this.roleRepository.findUsersByProjectId(projectId)
  }

  async createUser(userData: CreateUserDto): Promise<GetUserDto> {
    return await this.userRepository.addNew(userData);
  }
  
  async updateUserById(id: number, userData: UpdateUserDto): Promise<GetUserDto> {
    return await this.userRepository.updateById(id, userData);
  }

  async deleteUserById(id: number): Promise<BasicResponceDto> {
    return await this.userRepository.deleteById(id);
  }
}
