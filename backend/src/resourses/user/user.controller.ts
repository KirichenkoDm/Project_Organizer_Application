import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Put,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetUserDto, GetUserWithRoleDto } from "./dto/get-user.dto";
import { Public } from "../auth";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
    gets id of user to find
    returns found user first and last name
  */
  @Get(":id")
  async getUserById(
    @Param("id") id: number,
  ): Promise<GetUserDto> {
    return await this.userService.getUserById(id);
  }

  /*
    gets email of user to find
    returns found user id, first and last name
 */
  @Get("/email/:email")
  async getUserByEmail(
    @Param("email") email: string,
  ): Promise<GetUserDto> {
    return await this.userService.getUserByEmail(email);
  }

  /*
    gets id of project to find all related users
    search relations in roles table and join users data
    returns array of users id, first and last name and their roles
  */
  @Get("/project/:id")
  async getUsersByProjectId(
    @Param("id") projectId: number,
  ): Promise<GetUserWithRoleDto[]> {
    return await this.userService.getUsersByProjectId(projectId);
  }

  /*
    gets user data to create new user
    returns created user data
  */
  @Post()
  @Public()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<GetUserDto> {
    return await this.userService.createUser(createUserDto);
  }

  /*
    gets id of user and data to update it
    returns updated user data
  */
  @Put(":id")
  async updateUserById(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  /*
    gets id of user to delete
    returns responce with success message
  */
  @Delete(":id")
  async deleteUserById(
    @Param("id") id: number
  ): Promise<BasicResponceDto> {
    return this.userService.deleteUserById(id);
  }
}
