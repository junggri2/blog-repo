import React, { ReactNode } from "react";
import { IStorePost } from "@lib/interface";
import { StyleStorePostItem } from "@components/styled";
import Link from "next/link";

interface IStorePostItem {
   data: IStorePost
   idx: number
   children?: ReactNode
   deleteStoredPost(uid: string, idx: number): void
}

export const StorePostItem: React.FC<IStorePostItem> = ({ data, idx, deleteStoredPost }): JSX.Element => {

   const onClickDeleteBtn = () => {
      deleteStoredPost(data.uid, idx);
   };
   return (
      <>
         <Link href={`/write?temp=${data.uid}`}>
            <StyleStorePostItem>
               <div className="idx">{idx}</div>
               <div className="store__postname">{data.content_name}</div>
               <div className="created">{data.created}</div>
            </StyleStorePostItem>
         </Link>
         <section className="control-box">
            <button className="store__btn-box" onClick={onClickDeleteBtn}>삭제</button>
         </section>
      </>
   );
};
export default StorePostItem;