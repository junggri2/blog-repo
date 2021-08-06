import React, { ReactNode } from "react";
import { StyledHomeComp } from "@components/styled";
import HomeNavBar from "@components/homeNavBar";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import { fetcher } from "@lib/axios";
import { IStorePost } from "@lib/interface";
import StorePostList from "@components/storePostList";


interface IStoredPost {
   data: IStorePost[]
   children?: ReactNode
}

const StoredPost: React.FC<IStoredPost> = ({ data }): JSX.Element => {
   return (
      <StyledHomeComp>
         <h1>관리자 페이지</h1>
         <HomeNavBar />
         <StorePostList data={data} />
      </StyledHomeComp>
   );
};


export const getStaticProps: GetStaticProps = async (context: GetStaticPathsContext) => {
   const { data }: AxiosResponse<IStorePost> = await fetcher.getStoredPost();

   if (!data) {
      return {
         notFound: true,
      };
   }
   return {
      props: { data },
      revalidate: 10,
   };

};

export default StoredPost;