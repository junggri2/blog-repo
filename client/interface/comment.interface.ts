export interface ICommentDeletDataProps {
   board: number
   user: string
   pwd: string
   topic: string
   postsId: string
   deleteArr: number[]
}

export interface IContactData {
   content: string
   name: string
   email: string
   phone: null | string
}

export interface ISaveCommentProps {
   value: string
   user: string
   pwd: string
   group: number
   topic: string
   postId: string
   contentName: string
}

export interface IComment {
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

export interface ICommentValue {
   value: string
   cmtName: string
   cmtPwd: string
}