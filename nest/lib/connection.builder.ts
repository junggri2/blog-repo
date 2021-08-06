import connection from "@config/content.connection";
import commentConnection from "@config/comment.connection";
import tempConnection from "@config/temp.connetion";
import adminConnection from "@config/admin.connection";
import { PoolConnection } from "mysql2/promise";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContentConnection {
   async pool<T>(query: string, dep?: T[]) {
      const conn: PoolConnection | undefined = await connection();
      try {
         const [result] = await conn.execute(query, dep);
         return result;
      } catch (e) {
         console.log(e);
         return { state: false };
      } finally {
         conn.release();
      }
   }
}

@Injectable()
export class CommentConnection {
   async pool<T>(query: string, dep?: T[]) {
      const conn: PoolConnection | undefined = await commentConnection();
      try {
         const [result] = await conn.execute(query, dep);
         return { state: true, result };
      } catch (e) {
         console.log(e);
         return { state: false };
      } finally {
         conn.release();
      }
   }
}

@Injectable()
export class TempConnection {
   async pool<T>(query: string, dep?: T[]) {
      const conn: PoolConnection | undefined = await tempConnection();
      try {
         const [result] = await conn.execute(query, dep);
         return result;
      } catch (e) {
         console.log(e);
         return { state: false };
      } finally {
         conn.release();
      }
   }
}

@Injectable()
export class AdminConnection {
   async pool<T>(query: string, dep?: T[]) {
      const conn: PoolConnection | undefined = await adminConnection();
      try {
         const [result] = await conn.execute(query, dep);
         return result;
      } catch (e) {
         console.log(e);
         return { state: false };
      } finally {
         conn.release();
      }
   }
}
