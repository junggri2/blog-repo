import { ReactNode } from "react";

export interface IPost {
   content: string
   id: number
   comment: number | null
   uid: string
   content_name: string
   date: Date
   created: string
   file: string,
   detail: string
   thumbnail: string
   kindofPosts: string
   modified: string | null
   topic: string
   open: number
}

export interface IGetDataFromMode {
   content: string
   id: number
   topic: string
   uid: string
   content_name: string
   detail: string
   thumbnail: null | string,
   file: string
   created: string
   modified: null | string,
   kindofPosts: string
   date: Date
   comment: number
}

export interface IPostList {
   data: IPost[]
   children?: ReactNode
}

export interface IPostItem {
   data: IPost
   children?: ReactNode
   idx: number
   onChangePostState(value: number, topic: string, uid: string): void
   deletePost(topic: string, uid: string, idx: number): void
}

export interface IManagePost {
   data: IPost
   children?: ReactNode
}

export interface ITextEditRefObject extends HTMLElement {
   state: any
   editor: any
}

export interface ISelectTopic {
   tables: [{ topic: string, count: number }]
   onIsChecked: (value: string) => void
   children?: ReactNode
   checked: string
   token: string | null
   onRequestAfterMakeOrDeleteTopic: () => void
}

export interface Ref extends HTMLElement {
   current: any | null
   align: any
}

export interface ImgRef extends HTMLImageElement {
   src: any
}

export interface IKindofPosts {
   onCheck: (value: string) => void
   checked: string
}

export interface IThumbNail {
   token: string | null
   onChangeThumbnail: (img: string) => void
   thumbnail: string | null
}

export interface IThumbnailFetchData {
   state: boolean
   filename: string
}

export interface IStorePost {
   uid: string
   topic: string,
   content_name: string,
   created: string
   detail: string
   file: string
}