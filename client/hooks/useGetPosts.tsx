import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
import fetcher from "utils/fetcher";
import {PostAtom} from "@state/index";
import {AxiosResponse} from "axios";
import {IPostData} from "@interface/post.interface";

interface IUseGetPost {
   posts: IPostData[]
}

const UseGetPosts = (): IUseGetPost => {
   const [posts, setPosts] = useRecoilState(PostAtom);

   useEffect(() => {
      (async () => {
         const {data}: AxiosResponse<IPostData[]> = await fetcher.getAllPosts("open");
         setPosts(data);
      })();
   }, []);
   return {posts};
};

export default UseGetPosts;