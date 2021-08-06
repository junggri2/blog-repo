import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Injectable } from "@nestjs/common";

interface ITextInitialProps {
   contentName: string
   content: string
   topicName: string
   kindofPosts: string
   detail: string
   thumbnail: null | string
}

@Injectable()
export class saveDataCommonProcess {
   savePost(folderName: string, data: ITextInitialProps) {
      let query, dep;
      const uid = uuidv4();
      const today = new Date();
      const dateString = today.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
      if (folderName === "contents") {
         query = `INSERT INTO posts 
               (uid, topic, content_name, created, modified, file, kindofPosts, detail, thumbnail, date, comment, open) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
         dep = [uid, data.topicName, data.contentName, dateString, null, uid + ".html", data.kindofPosts, data.detail, data.thumbnail, new Date(), 0, 1];
      } else {
         query = `INSERT INTO store
               (uid, topic, content_name, created, file, detail) 
               VALUES (?,?,?,?,?,?)`;
         dep = [uid, data.topicName, data.contentName, dateString, uid + ".html", data.detail];
      }

      let _path = path.resolve(`../${folderName}`);

      const filePath = _path + `/${uid}.html`;
      return { uid, today, dateString, filePath, query, dep };
   }
}