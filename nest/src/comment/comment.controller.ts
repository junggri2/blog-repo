import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { commentDto } from "@src/comment/dto/create-comment.dto";
import { replyDto } from "@src/comment/dto/create-reply.dto";
import { deleteCommentDto } from "@src/comment/dto/delete-comment.dto";

interface IParams {
   postid: string
}

@Controller("comment")
export class CommentController {
   constructor(private commentService: CommentService) {
   }

   @Get("/comments/comment/posts/:postid")
   async getComment(@Param() params: IParams) {
      const data = await this.commentService.handleGetComment(params.postid);
      return data.result;
   }

   @Post("/comments")
   async saveComment(@Body() commentDto: commentDto) {
      await this.commentService.saveComment(commentDto);
   }

   @Post("/reply")
   async saveReply(@Body() reply: replyDto) {
      return await this.commentService.saveReply(reply);
   }

   @Post("/comments/items")
   async deleteComment(@Body() deleteDto: deleteCommentDto) {
      return await this.commentService.deleteComment(deleteDto);
   }
}
