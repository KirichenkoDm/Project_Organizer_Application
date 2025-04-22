import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { GetUserDto, GetUserWithRoleDto } from "./dto/get-user.dto";
import { Public } from "src/shared/public.decorator";
import { SkipRoles } from "src/shared/roles.decorator";
import { ParseNumberPipe } from "src/shared/parse-number.pipe";


@Controller("user")
@SkipRoles()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
    gets id of user to find
    returns found user first and last name
  */
  @Get(":id")
  async getUserById(
    @Param("id", ParseNumberPipe) id: number,
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
    @Param("id", ParseNumberPipe) projectId: number,
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
    @Param("id", ParseNumberPipe) id: number,
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
    @Param("id", ParseNumberPipe) id: number
  ): Promise<BasicResponseDto> {
    return this.userService.deleteUserById(id);
  }
}
