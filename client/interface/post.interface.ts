import { ReactNode } from "react";

export interface IPostData {
   id: number
   comment: number | null
   uid: string
   content_name: string
   date: string
   created: string
   file: string,
   detail: string
   thumbnail: string
   kindofPosts: string
   modified: string | null
   topic: string
   open: number
   like: number,
   dislike: number
}

export interface IPostCommonProps {
   id: number
   comment: number | null
   uid: string
   content_name: string
   date: string
   created: string
   file: string,
   detail: string
   thumbnail: string
   kindofPosts: string
   modified: string | null
   topic: string
   open: number
}

export interface IPostDataProps extends IPostData {
   content: string
}

export interface IPostState {
   children?: ReactNode
   identifier: string
}

export interface IState {
   like: string[],
   disLike: string[]
   [state: string]: string[]
}
