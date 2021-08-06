import React, {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {CommentAtom, CommentSelector} from "@state/index";
import fetcher from "utils/fetcher";
import {AxiosResponse} from "axios";
import {IComment} from "@interface/comment.interface";

interface IUseComment {
   reply: IComment[]
}

const UseComment = (identifier: string): IUseComment => {
   const [reply, setReply] = useRecoilState(CommentAtom);
   const filter = useRecoilValue(CommentSelector(identifier));

   useEffect(() => {
      (async () => {
         const {data}: AxiosResponse<IComment> = await fetcher.getComment(identifier);
         setReply(data);
      })();
   }, []);

   return {reply};
};

export default UseComment;