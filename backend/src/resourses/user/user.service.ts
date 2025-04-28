import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto, GetUserWithPasswordDto, GetUserWithRoleDto } from "./dto/get-user.dto";
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import * as bcrypt from 'bcrypt';
import { UserCore } from "./user.core";
import { RoleRepository } from "../role/role.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCore: UserCore,
    private readonly roleRepository: RoleRepository,
  ) { }

  async getUserById(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User with this id not found");
    }

    return this.userCore.mapperEntityToGetDto(user);
  }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    return this.userCore.mapperEntityToGetDto(user);
  }

  async getUserWithPasswordByEmail(email: string): Promise<GetUserWithPasswordDto> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    return this.userCore.mapperEntityToGetWithPasswordDto(user);
  }

  async getUsersByProjectId(projectId: number): Promise<GetUserWithRoleDto[]> {
    const users = await this.roleRepository.findUsersByProjectId(projectId);

    if(!users || users.length === 0) {
      throw new NotFoundException("Users related with this project not found");
    }

    return users;
  }

  async createUser(userData: CreateUserDto): Promise<GetUserDto> {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = await this.userRepository.save(userData);

    if (!user) {
      throw new BadRequestException("User was not created");
    }

    return this.userCore.mapperEntityToGetDto(user);
  }

  async updateUserById(id: number, userData: UpdateUserDto): Promise<GetUserDto> {
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException("User with this id not found");
    }

    const user = await this.userRepository.save({
      ...userToUpdate,
      ...userData,
    });

    return this.userCore.mapperEntityToGetDto(user);
  }

  async deleteUserById(id: number): Promise<BasicResponseDto> {
    const userToDelete = await this.userRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new NotFoundException("User with this id not found");
    }

    const result = await this.userRepository.softDelete(id);

    if(result.affected === 0) {
      throw new BadRequestException("User was not deleted");
    }

    return {
      message: "User successfully deleted",
      status: 204,
      isSuccess: true,
    }
  }
}
