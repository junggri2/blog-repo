import React, { RefObject } from "react";
import { StyledPostItems } from "@components/styled";
import { IPostItem } from "@lib/interface";
import Link from "next/link";


const PostItem: React.FC<IPostItem> = React.forwardRef(({ data, idx, onChangePostState, deletePost }, ref: RefObject<HTMLAnchorElement>) => {

   const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChangePostState(Number(e.target.value), data.topic, data.uid);
   };

   const onClickDeleteBtn = async () => {
      deletePost(data.topic, data.uid, idx);
   };

   return (
      <>
         <a href={`/manage/${data.uid}`} ref={ref}>
            <StyledPostItems>
               <li className="list-num">{data.id}</li>
               <li className="list-name">{data.content_name}</li>
               <li className="list-created">{data.created}</li>
               <li className="list-comment">{data.comment}</li>
            </StyledPostItems>
         </a>
         <div className="post__control_box">
            <section />
            <section>
               <select name="post_state" defaultValue={data.open} onChange={onChange}>
                  <option value="1">공개</option>
                  <option value="0">비공개</option>
               </select>
               <div className="post_meta_control_box">
                  <span><Link href={`/write?update=${data.uid}&topic=${data.topic}`}>수정</Link></span>
                  <span onClick={onClickDeleteBtn}>삭제</span>
               </div>
            </section>
         </div>
      </>
   );
});

export default PostItem;