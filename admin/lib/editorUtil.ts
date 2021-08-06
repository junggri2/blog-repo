import { ITextEditRefObject } from "@lib/interface";
import React from "react";

export const editorUtil = {
   initialData(setTempData) {
      setTempData({
         contentName: "",
         content: "",
         topicName: "",
         kindofPosts: "",
         detail: "",
         thumbnail: null,
      });
   },

   async handleDataFromMode(cb, textEditor: React.RefObject<ITextEditRefObject>, setTempData) {
      const { data } = await cb;
      if (textEditor.current) textEditor.current.editor.scrollingContainer.innerHTML = data.content;
      setTempData({
         contentName: data.content_name,
         topicName: data.topic,
         content: data.content,
         kindofPosts: data.kindofPosts,
         detail: data.detail,
         thumbnail: data.thumbnail ? data.thumbnail : null,
      });
   },
};