import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { Roles } from "src/shared/roles.decorator";
import { ParseNumberPipe } from "src/shared/parse-number.pipe";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  /*
  gets id of task to find related comment (pagination)
  returns array of comments ids, userids, users names and comment texts
*/
  @Get("/task/:id")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async getCommentsByTaskId(
    @Param("id", ParseNumberPipe) taskId: number,
    @Query("page", ParseNumberPipe) page: number,
  ): Promise<GetCommentDto[]> {
    return await this.commentService.getCommentsByTaskId(taskId, page);
  }

  /*
    gets comment data to create
    returns created comment data
  */
  @Post()
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<GetCommentDto> {
    return await this.commentService.createComment(createCommentDto);
  }

  /*
    gets id of comment and new text
    returns updated comment data
  */
  @Put(":id")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async updateCommentById(
    @Param("id", ParseNumberPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<GetCommentDto> {
    return await this.commentService.updateCommentById(id, updateCommentDto);
  }

  /*
     gets id of comment to delete
     returns responce with success message
   */
  @Put(":id")
  @Roles(
    RoleNamesEnum.Member,
    RoleNamesEnum.ProjectManager,
    RoleNamesEnum.Owner
  )
  async deleteCommentById(
    @Param("id", ParseNumberPipe) id: number,
  ): Promise<BasicResponseDto> {
    return await this.commentService.deleteCommentById(id);
  }
}
