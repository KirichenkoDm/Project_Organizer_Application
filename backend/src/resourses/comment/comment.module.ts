import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { CommentCore } from "./comment.core";

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentCore],
})
export class CommentModule {}
