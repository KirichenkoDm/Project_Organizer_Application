import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { GetUserDto, GetUserWithRoleDto } from "./dto/get-user.dto";
import { Public } from "src/shared/public.decorator";
import { SkipRoles } from "src/shared/roles.decorator";
import { ParseNumberPipe } from "src/shared/parse-number.pipe";
import { TokensDto } from "src/shared/dto/token.dto";
import { SetRefreshTokenInterceptor } from "src/shared/refresh-token.interceptor";


@Controller("user")
@SkipRoles()
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  /*
  gets email query of users to find
  returns found array of user id, first and last name
  */
 @Get("/search")
 async getUsersByEmail(
   @Query("email") email: string,
   @Query("currentProjectId") currentProjectId: number,
  ): Promise<GetUserDto[]> {
    return await this.userService.getUsersByEmail(email, currentProjectId);
  }
  
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
  @UseInterceptors(SetRefreshTokenInterceptor)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<TokensDto> {
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
