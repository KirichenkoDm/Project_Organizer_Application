import { Controller, Get, Post, Body, Param, Res, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { GetUserWithRoleDto } from "./dto/get-user-with-role.dto";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
    gets id of user to find
    returns found user first and last name or error message
  */
  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<GetUserDto | BasicResponceDto> {
    return;
  }

  /*
    gets email of user to find
    returns found user id, first and last name or error message
 */
  @Get("/email/:email")
  async getUserByEmail(@Param("email") email: string): Promise<GetUserDto | BasicResponceDto> {
    return;
  }

  /*
    gets id of project to find all related users
    search relations in roles table and join users data
    returns array of users id, first and last name and their roles or error message
  */
  @Get("/project/:id")
  async getUsersByProjectId(@Param("id") projectId: number): Promise<GetUserWithRoleDto[] | BasicResponceDto> {
    return;
  }

  /*
    gets user data to create new user
    returns responce with success/error message 
  */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of user and data to update it
    returns responce with success/error message
  */
  @Put(":id")
  async updateUserById(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto): Promise<BasicResponceDto> {
    return;
  }

  /*
    gets id of user to delete
    returns responce with success/error message
  */
  @Delete(":id")
  async deleteUserById(@Param("id") id: number): Promise<BasicResponceDto> {
    return;
  }
}
