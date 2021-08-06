import crypto from "crypto";
import util from "util";
import * as dotenv from "dotenv";

dotenv.config();

export interface ICommnet {
   board: number
   bgroup: number
   parent: number
   sorts: number
   depth: number
   cmt: string
   writer: string
   created: string
   pwd: string
   salt: string
}

dotenv.config();

const promiseSalt = util.promisify(crypto.randomBytes);
const promise = util.promisify(crypto.pbkdf2);

export async function cryptoPwd(pwd: string) {
   const buf = await promiseSalt(Number(process.env.CRYPTO_NUM));
   const salt = buf.toString("base64");
   const key = await promise(pwd, salt, Number(process.env.CRYPTO_ITER), Number(process.env.CRYPTO_NUM), String(process.env.CRYPTO_ALGO));
   const _pwd = key.toString("base64");
   return { salt, _pwd };
}

export async function decryptoPwd(data: ICommnet, pwd: string, writer: string) {
   if (data.writer === writer) {
      const key = await promise(pwd, data.salt, Number(process.env.CRYPTO_ITER), Number(process.env.CRYPTO_NUM), String(process.env.CRYPTO_ALGO));
      return data.pwd === key.toString("base64");
   } else {
      return false;
   }
}