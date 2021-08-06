import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {ContentService} from "@src/content/content.service";
import sanitize from "sanitize-html";
import {commentDto} from "@src/comment/dto/create-comment.dto";
import {cryptoPwd, decryptoPwd} from "@lib/cryptoPassword";
import sendMessage from "@lib/sendMessage";
import {replyDto} from "@src/comment/dto/create-reply.dto";
import {deleteCommentDto} from "@src/comment/dto/delete-comment.dto";
import connection from "@config/comment.connection";
import {PoolConnection} from "mysql2/promise";
import {CommentConnection} from "@lib/connection.builder";


@Injectable()
export class CommentService {
   constructor(
      @Inject(forwardRef(() => ContentService))
      private readonly contentService: ContentService,
      private readonly commentConnection: CommentConnection,
   ) {
   }

   private static makeDate() {
      const today = new Date();
      return today.toLocaleDateString("ko-KR", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   private static promiseArray(conn: any, query: string, dep: number[]): Promise<any> {
      return new Promise((resolve, reject) => {
         resolve(conn.execute(query, dep));
         conn.release();
      });
   }

   // constructor(
   //    @InjectConnection("comment")
   //    private connection: Connection,
   //    @InjectEntityManager("comment")
   //    private entityManager: EntityManager,
   // ) {

   // }
   async createNewCommentTable(uid: string) {
      const table_name = uid.replace(/-/g, "_");
      const query = `
               CREATE TABLE \`${table_name}\`(
               board int NOT NULL AUTO_INCREMENT PRIMARY KEY,
               parent int,
               bgroup int NOT NULL,
               sorts int NOT NULL,
               depth int NOT NULL,
               cmt varchar(2000) NOT NULL,
               writer varchar(45),
               created varchar(20) NOT NULL,
               pwd varchar(200) NOT NULL,
               salt varchar(150) NOT NULL
               )`;
      await this.commentConnection.pool(query);
   }

   async handleGetComment(postid: string) {
      const query = `SELECT board,parent,bgroup,sorts,depth,cmt,created,writer FROM 
                     \`${postid.replace(/-/g, "_")}\` 
                     order by bgroup asc, sorts asc
                     `;
      return await this.commentConnection.pool<string>(query);
   }

   async saveComment(data: commentDto) {
      const sanitize_writer: string = sanitize(data.user);
      const sanitize_pwd: string = sanitize(data.pwd);
      const _cyrpto: { salt: string, _pwd: string } = await cryptoPwd(sanitize_pwd);

      const query = `INSERT INTO \`${data.postId.replace(/-/g, "_")}\` (bgroup,sorts,depth,cmt,created,writer,pwd,salt) VALUES (?,?,?,?,?,?,?,?)`;
      const dep = [data.group, 0, 0, data.value, CommentService.makeDate(), sanitize_writer, _cyrpto._pwd, _cyrpto.salt];
      await this.commentConnection.pool<any>(query, dep);
      await this.contentService.increaseCmtCount<string, string>(data.topic, data.postId);
      if (process.env.NODE_ENV === "production") sendMessage(data.contentName, sanitize_writer, data.value);
   }

   async saveReply(data: replyDto) {
      try {
         const sanitize_writer: string = sanitize(data.user);
         const sanitize_pwd: string = sanitize(data.pwd);
         const _cyrpto: { salt: string, _pwd: string } = await cryptoPwd(sanitize_pwd);

         const table_name = data.postId.replace(/-/g, "_");
         const sort_query = `SELECT COALESCE (MIN(SORTS),0) FROM \`${table_name}\`
                          WHERE BGROUP = ${data.group}
                          AND SORTS > ${data.sorts}
                          AND DEPTH <= ${data.depth}
                           `;
         const {result}: any = await this.commentConnection.pool(sort_query);
         const sort = result[0]["COALESCE (MIN(SORTS),0)"];
         if (sort === 0) {
            const zeroQuery = `SELECT COALESCE(MAX(SORTS),0) + 1 FROM \`${table_name}\`
                            WHERE bgroup = ${data.group}`;
            const {result} = await this.commentConnection.pool(zeroQuery);
            const save_sort = result[0]["COALESCE(MAX(SORTS),0) + 1"];
            const save_query = `INSERT INTO \`${table_name}\` (parent,bgroup,sorts,depth,cmt,created,writer,pwd,salt) VALUES (?,?,?,?,?,?,?,?,?)`;
            const dep = [data.board, data.group, save_sort, data.depth + 1, data.value, CommentService.makeDate(), sanitize_writer, _cyrpto._pwd, _cyrpto.salt];
            await this.commentConnection.pool(save_query, dep);
         } else {
            const update_query = `UPDATE \`${table_name}\` SET SORTS=SORTS+1
                               WHERE bgroup=${data.group} AND sorts>=${sort}`;
            await this.commentConnection.pool(update_query);
            const save_query = `INSERT INTO \`${table_name}\` (parent,bgroup,sorts,depth,cmt,crea  ted,writer,pwd,salt) VALUES (?,?,?,?,?,?,?,?,?)`;
            const dep = [data.board, data.group, sort, data.depth + 1, data.value, CommentService.makeDate(), sanitize_writer, _cyrpto._pwd, _cyrpto.salt];
            await this.commentConnection.pool(save_query, dep);
         }
         await this.contentService.increaseCmtCount<string, string>(data.topic, data.postId);
         const comment = await this.handleGetComment(data.postId);
         return {state: true, data: comment.result};
      } catch (e) {
         console.error(e);
         return {state: false};
      }
   }

   async deleteComment(data: deleteCommentDto) {
      const conn: PoolConnection | undefined = await connection();
      if (conn !== undefined)
         try {
            const find_query = `SELECT * FROM \`${data.postsId.replace(/-/g, "_")}\` WHERE board = ?`;
            const dep = [data.board];
            const [result]: any = await conn.execute(find_query, dep);
            conn.release();
            const state: boolean = await decryptoPwd(result[0], data.pwd, data.user);

            if (state) {
               const query = `DELETE FROM \`${data.postsId.replace(/-/g, "_")}\` where board = ?`;
               const promises = data.deleteArr.map(e => CommentService.promiseArray(conn, query, [e]));
               await Promise.all(promises);
               await this.contentService.decreaseCmtCount<string, string>(data.topic, data.postsId, data.deleteArr.length);
               return {state: true};
            } else {
               conn.release();
               return {state: false};
            }
         } catch (e) {
            console.error(e);
            conn.release();
            return {state: false};
         }
   }

   async deleteCommentTable(uid: string) {
      const query = `DROP TABLE \`${uid.replace(/-/g, "_")}\``;
      await this.commentConnection.pool(query);
   }
}
