import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ContentService } from "./content.service";
import { createPostDto } from "@src/content/dto/create-post.dto";
import { createTempDto } from "@src/content/dto/create-temp-dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Request } from "Express";
import path from "path";
import { createTopicDto } from "@src/content/dto/create-topic.dto";
import { deletePostDto } from "@src/content/dto/delete-post.dto";
import { deleteTopicDto } from "@src/content/dto/delete-topic.dto";
import { UpdatePostStateDto } from "@src/content/dto/update-postState.dto";
import { PostStateDto } from "@src/content/dto/post-state.dto";

interface IParams {
   uid?: string
   topic?: string
   postId: string
   state?: string
}

declare module "express-session" {//기존의 session의 타입을 오버라이드한다.
   interface Session {
      img: string[] | null
   }
}


@Controller("content")
// @UseInterceptors(MorganInterceptor("combined"))
export class ContentController {
   constructor(
      private contentSevice: ContentService,
   ) {
   }

   @Get("/imgs")
   async getSavedImg() {
      return await this.contentSevice.getSavedImg();
   }

   @Get("/posts/items/state/:state")
   async getAllPosts(@Param() param: IParams) {
      return await this.contentSevice.getAllPost(param.state);
   }

   @Get("/posts/items/page/:page/offset/:offset")
   async getPaginationData(@Param() params: { page: number, offset: number }) {
      const data: any = await this.contentSevice.getAllPost("open");
      const posts = await this.contentSevice.getPostsForPagination(params.page, params.offset);
      return { posts, length: data.length };
   }

   @Get("/store/items")
   async getStoresPost() {
      return await this.contentSevice.getSotredPost();
   }

   @Get("/posts/item/:uid")
   async getPosts(@Param() parmas) {
      return await this.contentSevice.getPosts(parmas);
   }

   @Get("/topics/list")
   async getInitialDataTextEditor() {
      return await this.contentSevice.getInitialDataTextEditor();
   }

   @Get("/item/:uid")
   async getTemporayPost(@Param() params: IParams) {
      return await this.contentSevice.getTemporaryPost(params.uid);
   }

   @Post("/post")
   async savePost(@Body() postDto: createPostDto) {
      await this.contentSevice.savePost(postDto);
   }

   @Post("/temp")
   async saveTemporaryPost(@Body() tempDto: createTempDto) {
      return await this.contentSevice.saveTemporaryPost(tempDto);
   }

   @Post("/thumbnail")
   @UseInterceptors(FilesInterceptor("file", 10, {
      storage: diskStorage({
         destination: path.resolve("../thumbnail"),
         async filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            const filename = new Date().valueOf() + path.extname(file.originalname);
            callback(null, filename);
         },
      }),
   }))
   async handleThumbnail(@Req() req: Request, @UploadedFiles() files: Express.Multer.File) {
      return { state: true, filename: files[0].filename };
   }

   @Post("/topics")
   async createNewTopic(@Body() topicDto: createTopicDto) {
      await this.contentSevice.createNewTopic(topicDto);
   }

   @Post("/:topic/posts/:postId")
   async updatePost(@Body() updatePostDto: createPostDto, @Param() params: { topic: string, postId: string }) {
      await this.contentSevice.updatePostDto(updatePostDto, params);
   }

   @Post("/:topic/store/:tempId")
   async deleteTemporaryPostAndSavePost(@Body() createDto: createPostDto, @Param() params: { topic: string, tempId: string }) {
      await this.contentSevice.deleteTemporaryPostAndSavePost(createDto, params);
   }

   @Post("/posts/item")
   async deletePost(@Body() deleteDto: deletePostDto) {
      await this.contentSevice.deletePost(deleteDto);
   }

   @Post("/posts/state")
   async handlePostState(@Body() postStateDto: UpdatePostStateDto) {
      await this.contentSevice.handleUpdatePostState(postStateDto);
   }

   @Post("/store/item")
   async deleteTemporaryPost(@Body() deleteTempPost: { postid: string }) {
      const data = await this.contentSevice.deleteTemporaryPost(deleteTempPost);
      if (data) {
         return { state: true };
      } else {
         return { state: false };
      }
   }

   @Post("/topics/item")
   async deleteTopic(@Body() deleteTopicDto: deleteTopicDto) {
      const state = await this.contentSevice.deleteTopicDto(deleteTopicDto);
      if (state) {
         return { state: true };
      } else {
         return { state: false };
      }
   }

   @Post("/state")
   async changePostState(@Body() dto: PostStateDto) {
      await this.contentSevice.changePostSate(dto);
   }
}
