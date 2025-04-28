import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "./comment.repository";
import { GetCommentDto } from "./dto/get-comment.dto";
import { CommentCore } from "./comment.core";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentCore: CommentCore,
  ) { }

  async getCommentsByTaskId(taskId: number, page: number): Promise<GetCommentDto[]> {
    const comments = await this.commentRepository.findByTaskId(taskId, page);

    if (!comments || comments.length === 0) {
      throw new NotFoundException("Comments for this task not found");
    }

    return comments.map(comm => this.commentCore.mapperEntityToGetDTO(comm))
  }

  async createComment(commentData: CreateCommentDto): Promise<GetCommentDto> {
    const comment = await this.commentRepository.save(commentData);

    if (!comment) {
      throw new BadRequestException("Comment was not created");
    }

    return this.commentCore.mapperEntityToGetDTO(comment);
  }

  async updateCommentById(id: number, commentData: UpdateCommentDto): Promise<GetCommentDto> {
      const commentToUpdate = await this.commentRepository.findOneBy({ id });
      if (!commentToUpdate) {
        throw new NotFoundException("Comment with this id not found");
      }
  
      const comment = await this.commentRepository.save({
        ...commentToUpdate,
        ...commentData,
      });
  
      if (!comment) {
        throw new BadRequestException("Comment was not updated");
      }
  
      return this.commentCore.mapperEntityToGetDTO(comment);
    }
  
  async deleteCommentById(id: number): Promise<BasicResponseDto> {
      const commentToDelete = await this.commentRepository.findOneBy({ id });
  
      if (!commentToDelete) {
        throw new NotFoundException("Comment with this id not found");
      }
  
      const result = await this.commentRepository.softDelete(id);
  
      if (result.affected === 0) {
        throw new BadRequestException("Comment was not deleted");
      }
  
      return {
        message: "Comment successsfully deleted",
        status: 204,
        isSuccess: true,
      }
    }
}
