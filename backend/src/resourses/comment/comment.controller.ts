import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Put,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Response } from "express";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { GetCommentDto } from "./dto/get-comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /*
  gets id of task to find related comment (pagination)
  returns array of comments ids, userids, users names and comment texts
*/
  @Get("/task/:id")
  async getCommentsByTaskId(
    @Param("id") taskId: number,
    @Res() response: Response,
  ): Promise<GetCommentDto[]> {
    return;
  }

  /*
    gets comment data to create
    returns created comment data
  */
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Res() response: Response,
  ): Promise<GetCommentDto> {
    return;
  }

  /*
    gets id of comment and new text
    returns updated comment data
  */
  @Put(":id")
  async updateCommentById(
    @Param("id") id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() response: Response,
  ): Promise<GetCommentDto> {
    return;
  }

  /*
     gets id of comment to delete
     returns responce with success message
   */
  @Put(":id")
  async deleteCommentById(
    @Param("id") id: number,
    @Res() response: Response,
  ): Promise<BasicResponceDto> {
    return;
  }
}
