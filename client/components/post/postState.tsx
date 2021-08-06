import React, {ReactNode, useEffect, useRef, useState} from "react";
import {IState} from "@interface/post.interface";
import useCsrf from "@hooks/useCsrf";
import {PostStateComponent} from "@components/post/posts.styled";
import fetcher from "utils/fetcher";

;

interface IPostState {
   identifier: string
   children?: ReactNode

}

const PostState: React.FC<IPostState> = ({identifier}): JSX.Element => {
   const [postState, setPostState] = useState<IState>({like: [], disLike: []});
   const csrf = useCsrf();
   const smileRef = useRef<HTMLImageElement>(null);
   const frownRef = useRef<HTMLImageElement>(null);

   useEffect(() => {
      const getLikeList = localStorage.getItem("ps");
      if (getLikeList !== null) setPostState(JSON.parse(getLikeList));
   }, []);

   const onClickStateBtn = async (e: React.MouseEvent<HTMLLIElement>) => {
      const state = e.currentTarget.dataset.state as string;
      const compare = state === "like" ? "disLike" : "like";

      if (!postState[state].includes(identifier) && !postState[compare].includes(identifier)) {
         postState[state].push(identifier);
         await fetcher.postState(csrf as string, state, identifier, "up");
      } else if (!postState[state].includes(identifier) && postState[compare].includes(identifier)) {
         postState[state].push(identifier);
         postState[compare].splice(postState[compare].indexOf(identifier, 1));
         await fetcher.postState(csrf as string, state, identifier, "both");
      } else {
         postState[state].splice(postState[state].indexOf(identifier, 1));
         await fetcher.postState(csrf as string, state, identifier, "down");
      }

      localStorage.setItem("ps", JSON.stringify(postState));
      setPostState({...postState});
   };
   return (
      <PostStateComponent>
         <h1>어떻게 읽으셨나요?</h1>
         <h2>버튼 클릭만으로도 큰 도움이 됩니다.</h2>
         <ul>
            <li className={postState.like.includes(identifier) ? "like click_like" : "like"} onClick={onClickStateBtn} data-state="like">
               <img src={!postState.like.includes(identifier) ? "/images/smile.svg" : "/images/smileColor.svg"} alt="웃는이미지" ref={smileRef}/>
            </li>
            <li className={postState.disLike.includes(identifier) ? "dislike click_dislike" : "dislike"} onClick={onClickStateBtn} data-state="disLike">
               <img src={!postState.disLike.includes(identifier) ? "/images/frown.svg" : "/images/frownColor.svg"} alt="웃지않는 이미지" ref={frownRef}/>
            </li>
         </ul>
      </PostStateComponent>
   );
};

export default PostState;