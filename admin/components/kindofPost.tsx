import React from "react";
import { StyledKindOfPost, StyledKindOfPostItem } from "@components/styled";
import { IKindofPosts } from "@lib/interface";


const KindOfPost: React.FC<IKindofPosts> = ({ onCheck, checked }): JSX.Element => {

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheck(e.target.value);
   };

   return (
      <StyledKindOfPost>
         <h1>게시글 종류</h1>
         <StyledKindOfPostItem>
            <input className="select-input" type="radio" id="kind-of-notice" onChange={onChange} value="notice" name='kindofpost' checked={checked === "notice"} />
            <label className="select-label" htmlFor="kind-of-notice">공지</label>
         </StyledKindOfPostItem>
         <StyledKindOfPostItem>
            <input className="select-input" type="radio" id="kind-of-posts" onChange={onChange} value="posts" name='kindofpost' checked={checked === "posts"} />
            <label className="select-label" htmlFor="kind-of-posts">게시물</label>
         </StyledKindOfPostItem>
      </StyledKindOfPost>
   );
};

export default React.memo(KindOfPost);