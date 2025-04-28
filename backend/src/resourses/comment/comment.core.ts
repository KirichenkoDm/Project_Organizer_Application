import { CommentEntity } from "./comment.entity";
import { GetCommentDto } from "./dto/get-comment.dto";

export class CommentCore {
  mapperEntityToGetDTO(comment: CommentEntity): GetCommentDto {
    return {
      id: comment.id,
      userId: comment.user.id,
      userFirstName: comment.user.firstName,
      userLastName: comment.user.lastName,
      text: comment.text,
    }
  }
}