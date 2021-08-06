import React, { ReactNode, useMemo } from "react";
import { IStorePost, Ref } from "@lib/interface";
import { StyleStorePostList } from "@components/styled";
import StorePostItem from "@components/storePostItem";
import useCSRF from "@useHooks/useCSRF";
import { fetcher } from "@lib/axios";


interface ISotrePostItem {
   data: IStorePost[]
   children?: ReactNode
}

const StorePostList: React.FC<ISotrePostItem> = ({ data }): JSX.Element => {
   const token: string | null = useCSRF();

   const storeList: React.RefObject<Ref>[] | undefined = useMemo(
      () => data.map(() => React.createRef(),
      ), [data]);

   const deleteStoredPost = async (uid: string, idx: number) => {
      if (token && window.confirm("삭제할꺼야?")) {
         const { data } = await fetcher.deleteStoredPost(uid, token);
         if (data.state) {
            storeList[idx].current.style.display = "none";
         } else {
            alert("오류가 났습니다");
         }
      }
   };

   return (
      <StyleStorePostList>
         {data.map((e, i) =>
            <article ref={storeList[i]} key={e.uid}>
               <StorePostItem
                  data={e}
                  idx={i}
                  deleteStoredPost={deleteStoredPost}
               />
            </article>,
         )}
      </StyleStorePostList>
   );
};

export default StorePostList;