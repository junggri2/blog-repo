import { Injectable } from "@nestjs/common";
import { AdminConnection } from "@lib/connection.builder";
import { IAuthDto } from "@src/admin/dto/auth.dto";
import { IContactDto } from "@src/admin/dto/contact.dto";
import util from "util";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

@Injectable()
export class AdminService {
   constructor(
      private readonly AdminConnection: AdminConnection,
   ) {
   }

   async checkIsAuth(dto: IAuthDto) {
      try {
         const result: any = await this.AdminConnection.pool("select * from user where id =?", [dto.id]);
         if (!!result.length) {
            const key = await pbkdf2Promise(dto.pwd, result[0].salt, Number(process.env.CRYPTO_ITER), Number(process.env.CRYPTO_NUM), String(process.env.CRYPTO_ALGO));
            return result[0].password === key.toString("base64");
         } else {
            return false;
         }
      } catch (e) {
         console.log(e);
      }
   }

   async saveContact(dto: IContactDto) {
      try {
         const uid = uuidv4();
         const query = `INSERT INTO msg (uid,content,name,email,phone,created) values (?,?,?,?,?,?)`;
         const dep = [uid, dto.content, dto.name, dto.email, dto.phone, new Date()];
         await this.AdminConnection.pool(query, dep);
         return { state: true };
      } catch (e) {
         return { state: false };
      }
   }
}
