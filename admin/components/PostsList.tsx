import React, { useMemo } from "react";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import { IPost, IPostList, Ref } from "@lib/interface";
import { fetcher } from "@lib/axios";
import { StyledPostContainer } from "@components/styled";
import PostItem from "@components/PostItem";
import Link from "next/link";
import useCSRF from "@useHooks/useCSRF";


const PostList: React.FC<IPostList> = ({ data }) => {
   const token: string | null = useCSRF();

   const postList: React.RefObject<Ref>[] | undefined = useMemo(
      () => data.map(() => React.createRef(),
      ), [data]);


   const onChangePostState = async (value: number, topic: string, uid: string) => {
      if (typeof token === "string") {
         await fetcher.changePostState(value, topic, uid, token);
      }
   };

   const onClickDeleteBtn = async (topic: string, uid: string, idx: number) => {
      const check = window.confirm("삭제할꺼야??");
      if (token && check) {
         await fetcher.deletePost(topic, uid, token);
         postList[idx].current.style.display = "none";
      }
   };


   return (
      <StyledPostContainer>
         <nav>
            <li className="list-num">번호</li>
            <li className="list-name">제목</li>
            <li className="list-created">작성일</li>
            <li className="list-comment">댓글</li>
         </nav>
         {data.map((e, i) => (
            <article ref={postList[i]} key={i}>
               <Link href="/" key={e.uid} passHref>
                  <PostItem
                     data={e}
                     idx={i}
                     onChangePostState={onChangePostState}
                     deletePost={onClickDeleteBtn}
                  />
               </Link>
            </article>
         ))}
      </StyledPostContainer>
   );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPathsContext) => {
   const { data }: AxiosResponse<IPost[]> = await fetcher.getPosts();

   if (!data) {
      return {
         notFound: true,
      };
   }

   return {
      props: { data },

   };
};

export default PostList;