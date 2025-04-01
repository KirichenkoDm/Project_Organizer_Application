import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /*
    gets user data to create new user
    returns responce with success/error message 
  */
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of user and data to update it
    returns responce with success/error message
  */
  @Patch(':id') // @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {

  }

  //archive

  /*
    gets id of user to find
    returns found user first and last name or error message
  */
  @Get(':id')
  async getUserById(
    @Param('id') id: number,
    @Res() response: Response,
  ) {

  }

  /*
   gets email of user to find
   returns found user id, first and last name or error message
 */
  @Get('/email/:email')
  async getUserByEmail(
    @Param('email') email: string,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of project to find all related users
    search relations in roles table and join users data
    returns array of users id, first and last name and their roles or error message
  */
  @Get('/project/:id')
  async getUsersOfProject(
    @Param('id') projectId: number,
    @Res() response: Response,
  ) {

  }
}
