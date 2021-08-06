import { onSetContent, onSetContentName, onSetDetail, onSetKindOfPosts, onSetTag, onSetTempData, onSetThumbNail, onSetTopic } from "./index";

export interface ITextInitialProps {
   contentName: string
   content: string
   topicName: string
   kindofPosts: string
   detail: string
   tags: string
   thumbnail: null | string
}

export interface ITempPost {
   uid: string,
   topic: string,
   content_name: string,
   created: string,
   detail: string,
   file: string
}

export type EditorAction =
   | ReturnType<typeof onSetContent>
   | ReturnType<typeof onSetContentName>
   | ReturnType<typeof onSetTopic>
   | ReturnType<typeof onSetKindOfPosts>
   | ReturnType<typeof onSetDetail>
   | ReturnType<typeof onSetTempData>
   | ReturnType<typeof onSetThumbNail>
   | ReturnType<typeof onSetTag>

export interface ITextEditModuleProps {
   data: ITextInitialProps
   setContent: (payload: string) => void
   setContentName: (payload: string) => void
   setTopic: (payload: string) => void
   setKindOfPosts: (payload: string) => void
   setDetail: (payload: string) => void
   setThumbnail: (payload: string) => void
   setTempData: (payload: any) => void
   setTag: (payload: string) => void
}