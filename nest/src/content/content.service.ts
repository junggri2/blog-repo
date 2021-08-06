import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ContentConnection } from "@lib/connection.builder";
import { MakeFilePath } from "@lib/makeFilePath";
import { promises as fs } from "fs";
import { createPostDto } from "@src/content/dto/create-post.dto";
import { saveDataCommonProcess } from "@lib/saveDataCommonProcess";
import { CommentService } from "@src/comment/comment.service";
import { createTempDto } from "@src/content/dto/create-temp-dto";
import path from "path";
import { createTopicDto } from "@src/content/dto/create-topic.dto";
import { deletePostDto } from "@src/content/dto/delete-post.dto";
import { deleteTopicDto } from "@src/content/dto/delete-topic.dto";
import { UpdatePostStateDto } from "@src/content/dto/update-postState.dto";
import { PostStateDto } from "@src/content/dto/post-state.dto";


interface IData {
   [index: string]: any | { state: boolean }
}

@Injectable()
export class ContentService {
   constructor(
      @Inject(forwardRef(() => CommentService))
      private readonly commentService: CommentService,
      private readonly connection: ContentConnection,
      private readonly makeFilePath: MakeFilePath,
      private readonly saveDataCommonProcess: saveDataCommonProcess,
   ) {
   }

   async getSavedImg() {
      return await fs.readdir(path.resolve("../thumbnail"), "utf8");
   }

   async getAllPost(state: string) {
      const query = state === "all"
         ? "select * from posts order by date desc"
         : "select * from posts where open=1 order by date desc";
      return await this.connection.pool(query);

   }

   async getPostsForPagination(page: number, offset: number) {
      const query = `select * from posts where open=1 order by id desc limit ${offset} offset ${(page - 1) * offset}`;
      return await this.connection.pool(query);
   }

   async getPosts(parmas: { uid: string }) {
      const _path = this.makeFilePath.makePath<string>("contents", parmas.uid);
      const content = await fs.readFile(_path.filePath, "utf8");
      const data = await this.connection.pool(`select * from posts where uid = ?`, [parmas.uid]);
      return { content: content, ...data[0] };
   }

   async getSotredPost() {
      return await this.connection.pool("select * from store");
   }

   async getInitialDataTextEditor() {
      const query = "select * from topics";
      const tables = await this.connection.pool(query);
      return { tables };
   }

   async getTemporaryPost(uid: string) {
      const _path = this.makeFilePath.makePath<string>("temporary-storage", uid);
      const result = await this.connection.pool(`SELECT * FROM store where uid =?`, [uid]);
      const content: string = await fs.readFile(_path.filePath, "utf8");
      return { content: content, ...result[0] };
   }

   async savePost(data: createPostDto) {
      const updateCountQuery = `update topics set count = count + 1 where topic = ?`;
      const countDep = [data.topicName];
      const saveData = this.saveDataCommonProcess.savePost("contents", data);
      await this.connection.pool(saveData.query, saveData.dep);
      await this.connection.pool(updateCountQuery, countDep);
      await fs.writeFile(saveData.filePath, data.content, "utf8");
      await this.commentService.createNewCommentTable(saveData.uid);
   }

   async saveTemporaryPost(dto: createTempDto) {
      const saveData = this.saveDataCommonProcess.savePost("temporary-storage", dto.data);
      if (dto.uid === undefined) {
         await this.connection.pool(saveData.query, saveData.dep);
         await fs.writeFile(saveData.filePath, dto.data.content, "utf8");
      } else {
         const result = await this.connection.pool("select 1 from store where uid=?", [dto.uid]);
         if (result[0][1] === 1) {
            const query = `UPDATE store SET content_name = ? , detail = ? WHERE uid = ?`;
            const dep = [dto.data.contentName, dto.data.detail, dto.uid];
            await this.connection.pool(query, dep);
            await fs.writeFile(path.resolve("../temporary-storage") + `/${dto.uid}.html`, dto.data.content, "utf8");
         } else {
            return { state: false };
         }
      }
      return { state: true };
   }

   async createNewTopic(topicDto: createTopicDto) {
      const query = `INSERT INTO topics VALUES (?,?)`;
      const dep = [topicDto.topic, 0];
      await this.connection.pool(query, dep);
   }

   async updatePostDto(dto: createPostDto, params: { topic: string, postId: string }) {
      const _path = this.makeFilePath.makePath("contents", params.postId);
      const dateString = new Date().toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });

      const query = `UPDATE posts SET content_name = ?, topic = ?, kindofPosts = ?, detail = ?, modified = ?, thumbnail=? WHERE uid = ?`;
      const dep = [dto.contentName, dto.topicName, dto.kindofPosts, dto.detail, dateString, dto.thumbnail, params.postId];
      await fs.writeFile(_path.filePath, dto.content, "utf8");
      await this.connection.pool(query, dep);
   }

   async deleteTemporaryPostAndSavePost(dto: createPostDto, params: { topic: string, tempId: string }) {
      const _path = this.makeFilePath.makePath("temporary-storage", params.tempId);
      const saveData = this.saveDataCommonProcess.savePost("contents", dto);
      const updateCountQuery = `update topics set count = count + 1 where topic = ?`;
      const countTopicDep = [params.topic];
      const query = `DELETE FROM store WHERE uid=?`;
      const dep = [params.tempId];

      await this.connection.pool(saveData.query, saveData.dep);
      await this.connection.pool(query, dep);
      await this.connection.pool(updateCountQuery, countTopicDep);
      await fs.unlink(_path.filePath);
      await fs.writeFile(saveData.filePath, dto.content, "utf8");
      await this.commentService.createNewCommentTable(saveData.uid);
   }

   async handleUpdatePostState(dto: UpdatePostStateDto) {
      const query = `UPDATE posts SET open = ? WHERE uid = ?`;
      const dep = [dto.isOpen, dto.uid];
      await this.connection.pool(query, dep);
   }

   async deletePost(dto: deletePostDto) {
      const _path = this.makeFilePath.makePath("contents", dto.uid);
      const query = `DELETE FROM posts WHERE uid=?`;
      const updateCountQuery = `update topics set count = count - 1 where topic = ?`;
      const countTopicDep = [dto.topic];
      await this.connection.pool(updateCountQuery, countTopicDep);
      await this.commentService.deleteCommentTable(dto.uid);
      await this.connection.pool(query, [dto.uid]);
      await fs.unlink(_path.filePath);
   }

   async deleteTemporaryPost(dto: { postid: string }) {
      const query = "DELETE FROM store where uid = ?";
      const dep = [dto.postid];
      const data = await this.connection.pool(query, dep);
      const _path = this.makeFilePath.makePath("temporary-storage", dto.postid);
      await fs.unlink(_path.filePath);
      return data;
   }

   async deleteTopicDto(dto: deleteTopicDto) {
      const query: string = `delete from topics where topic = ?`;
      const dep = [dto.topic];
      const deletePost = `delete `;
      return await this.connection.pool(query, dep);
   }

   public async increaseCmtCount<T, U>(topic: T, postid: U) {
      const query = `UPDATE posts SET comment = comment+1 WHERE uid = ?`;
      const dep = [postid];
      await this.connection.pool(query, dep);
   }

   public async decreaseCmtCount<T, U>(topic: T, postid: U, length: number) {
      const result = await this.connection.pool(`select comment from posts where uid = ?`, [postid]);
      if (result[0].comment - 1 >= 0) {
         const query = `UPDATE posts set comment = comment-${length} where uid = ?`;
         const dep = [postid];
         await this.connection.pool(query, dep);
      }
   }

   public async changePostSate(dto: PostStateDto) {
      let query: string;
      let dep: string[];
      if (dto.howToChange === "up") {
         query = `UPDATE posts SET \`${dto.state}\` = \`${dto.state}\` + 1 WHERE uid = ?`;
         dep = [dto.uid];
      } else if (dto.howToChange === "both") {
         const compare = dto.state === "like" ? "disLike" : "like";
         query = `UPDATE posts set \`${dto.state}\` = \`${dto.state}\` + 1, \`${compare}\` = \`${compare}\` - 1 where uid = ?`;
         dep = [dto.uid];
      } else {
         query = `UPDATE posts set \`${dto.state}\` = \`${dto.state}\` - 1 where uid = ?`;
         dep = [dto.uid];
      }
      await this.connection.pool(query, dep);
   }
}
