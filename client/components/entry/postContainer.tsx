import React, {useRef} from "react";
import {_postContainer} from "@components/styled/entry";
import {IPostContainer} from "@interface/component";
import Link from "next/link"
import PostItem from "@components/entry/postItem";

const PostContainer: React.FC<IPostContainer> = ({posts, width}): JSX.Element => {
   const container_ref = useRef<HTMLTableSectionElement>(null);
   
   return (
      <_postContainer width={width} ref={container_ref}>
         {posts.map(post =>
            <Link href={`/post/${post.uid}`} key={post.uid}>
               <a>
                  <PostItem/>
               </a>
            </Link>
         )}
      </_postContainer>
   );
};

export default PostContainer;