import path from "path";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MakeFilePath {
   makePath<T>(folderName: T, fileName: T) {
      let _path = path.resolve(`../${folderName}`);
      const filePath = _path + `/${fileName}.html`;
      return { filePath: filePath, _path: _path };
   }
}