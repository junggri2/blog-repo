import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextRouter, useRouter } from "next/router";
import { IManagePost } from "@lib/interface";
import { StyledManagePost } from "@components/styled";
import Highlight from "react-highlight.js";
import { fetcher } from "@lib/axios";

const ManagePost: React.FC<IManagePost> = ({ data }): JSX.Element => {
   const router: NextRouter = useRouter();

   const stringToHtml = () => ({ __html: data.content });

   if (router.isFallback) {
      return <div>,,,로딩중</div>;
   }
   return (
      <StyledManagePost>
         <article>
            <div className="posts-container-iconbox">
            </div>
            <div className="posts-name">
               {data.content_name}
            </div>
            <div className="posts-detail">
               {data.detail}
            </div>
            <Highlight language="javascript">
               <div dangerouslySetInnerHTML={stringToHtml()} className="posts-content" />
            </Highlight>
            <div className="posts-created">
               {data.created}
            </div>
         </article>
      </StyledManagePost>
   );
};


export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [{ params: { postid: "3170a741-fcbc-4f3c-bac6-31fc5f56683d" } }],
      fallback: true,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

   const postid: string | string[] = params.postid;


   const { data } = await fetcher.getSpecificPost(postid as string);

   if (!data) {
      return {
         notFound: true,
      };
   }

   return {
      props: {
         data,
      },
   };

};

export default ManagePost;