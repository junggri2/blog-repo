import React, { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { StyledHomeComp } from "@components/styled";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import { IPost } from "@lib/interface";
import { fetcher } from "@lib/axios";
import useTopic from "@useHooks/useTopic";

// import { IPostCommonProps } from "@module/"


interface IAdminHome {
   data: IPost[]
   children?: ReactNode
}

const ManagePostPage: React.FC = (props: PropsWithChildren<IAdminHome>) => {
   const { topicList, getTopicAndStoredPost } = useTopic();
   const [topic, setTopic] = useState<string>("all");
   const [list, setList] = useState<IPost[] | null>(null);


   useEffect(() => {
      getTopicAndStoredPost();
   }, []);

   useEffect(() => {
      if (topic !== "all") setList(props.data.filter(e => e.topic === topic));
      else setList(props.data);
   }, [topic]);

   const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTopic(e.target.value);
   };

   console.log(list);
   return (
      <StyledHomeComp>
         <h1>포스트 관리하기</h1>
         <section className="select-topic">
            <div className="select-topic-dropbox">
               <span>토픽 선택하기</span>
               <select name="topic" onChange={onChange}>
                  <option defaultChecked value="all">전제선택</option>
                  {topicList?.tables.map(e => (
                     <option value={e.topic} key={e.topic}>{e.topic}</option>
                  ))}
               </select>
            </div>
         </section>

         {/*<h1>관리자 페이지</h1>*/}
         {/*<HomeNavBar />*/}
         {/*<PostList data={props.data} />*/}
      </StyledHomeComp>
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
      revalidate: 1,
   };

};

export default ManagePostPage;