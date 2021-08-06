import { forwardRef, Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentConnection } from "@lib/connection.builder";
import { ContentModule } from "@src/content/content.module";

@Module({
   imports: [forwardRef(() => ContentModule)],
   controllers: [CommentController],
   providers: [
      CommentService,
      CommentConnection,
   ],
   exports: [CommentService],
})
export class CommentModule {
}
