import { forwardRef, Module } from "@nestjs/common";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { ContentConnection } from "@lib/connection.builder";
import { saveDataCommonProcess } from "@lib/saveDataCommonProcess";
import { MakeFilePath } from "@lib/makeFilePath";
import { CommentModule } from "@src/comment/comment.module";
import { MulterModule } from "@nestjs/platform-express";
import path from "path";

@Module({
   imports: [
      forwardRef(() => CommentModule),
      MulterModule.register({
         dest: path.resolve("../thumbnail"),
         limits: { fileSize: 20 * 1024 * 1024 },
      }),
   ],
   controllers: [ContentController],
   providers: [
      MakeFilePath,
      ContentConnection,
      saveDataCommonProcess,
      ContentService,
   ],
   exports: [ContentService],
})
export class ContentModule {

}
