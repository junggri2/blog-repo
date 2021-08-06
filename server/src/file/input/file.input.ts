import {ReadStream} from "fs";

export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string

    createReadStream(): ReadStream
}

export interface S3Params {
    path: string
    filename: string
    mimetype: string
    body: ReadStream | string
}

