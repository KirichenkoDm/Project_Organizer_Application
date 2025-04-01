import { Controller, Get, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  /*
    gets comment data to create
    returns responce with success/error message 
  */
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Res() response: Response,
  ) {

  }

  /*
    gets id of comment and new text
    returns responce with success/error message
  */
  @Patch(':id') // @Put(':id')
  async updateCommentById(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() response: Response,
  ) {

  }

  //archive

  /*
    gets id of task to find related comment (pagination)
    returns array of tasks id and text or error message
  */
  @Get('/task/:id')
  async getUserById(
    @Param('id') taskId: number,
    @Res() response: Response,
  ) {

  }
}
