import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { useCallback } from "react";
import { onRequestTopicAndStoredPost } from "@module/Topic";

export default function useTopic() {
   const dispatch = useDispatch();
   const { topicList, loading, error } = useSelector((state: RootState) => state.topic);


   const getTopicAndStoredPost = useCallback(() => {
      dispatch(onRequestTopicAndStoredPost());
   }, [dispatch]);


   return { topicList, loading, error, getTopicAndStoredPost };
}