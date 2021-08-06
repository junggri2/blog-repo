import instance from "@config/axios.config";
import { AxiosPromise } from "axios";
import { ITextInitialProps } from "@module/TextEditor/textEdit.interface";


export const fetcher = {
   getCsrfToken() {
      return instance({
         url: "/api/csrf",
      });
   },

   getPosts() {
      return instance({
         url: "/content/posts/items/state/all",
         method: "get",
      });
   },

   getStoredPost() {
      return instance({
         url: "/content/store/items",
         method: "get",
      });
   },

   getSpecificPost(postid: string) {
      return instance({
         url: `/content/posts/item/${postid}`,
         method: "get",
      });
   },

   getTopic() {
      return instance({
         url: "/content/topics/list",
         method: "get",
      });
   },

   getSavedImg(): AxiosPromise<any> {
      return instance({
         url: "/content/imgs",
         method: "get",
      });
   },

   getDataFromMode(uid: string, topic?: string) {
      const URL: string = topic === undefined
         ? `/content/item/${uid}`
         : `/content/posts/item/${uid}`;

      return instance({
         url: URL,
         method: "get",
      });
   },

   authIsAdmin(token: string, id: string, pwd: string) {
      return instance({
         url: "/admin/check/auth",
         method: "post",
         headers: { "X-XSRF-TOKEN": token },
         data: { id, pwd },
      });
   },

   changePostState(postState: number, topic: string, uid: string, token: string) {
      return instance({
         url: "/content/posts/state",
         method: "post",
         data: { isOpen: postState, topic, uid },
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   getJwtToken() {
      return instance({
         url: "/admin/token",
         method: "get",
      });
   },

   createTopic(topic: string, token: string) {
      return instance({
         url: "/content/topics",
         method: "post",
         data: { topic: topic },
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   saveNewPost(data: ITextInitialProps, csrf: string) {
      return instance({
         url: `/content/post`,
         method: "post",
         data: data,
         headers: { "X-XSRF-TOKEN": csrf },
      });
   },

   saveStoredPost(data: ITextInitialProps, csrf: string, temp_id?: string) {
      return instance({
         url: "/content/temp",
         method: "post",
         data: { data: data, uid: temp_id },
         headers: { "X-XSRF-TOKEN": csrf },
      });
   },

   deleteStorePostsAndMakeNewPost(data: ITextInitialProps, uid: string, token: string) {
      return instance({
         url: `/content/${data.topicName}/store/${uid}`,
         method: "post",
         data: data,
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   updatePost(data: ITextInitialProps, uid: string, token: string) {
      return instance({
         "url": `/content/${data.topicName}/posts/${uid}`,
         method: "post",
         data: data,
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   saveThumbnail(token: string, data: any): AxiosPromise<any> {
      return instance({
         url: "/content/thumbnail",
         method: "post",
         data: data,
         headers: {
            "X-XSRF-TOKEN": token,
            "Content-Type": "multipart/form-data",
         },
      });

   },

   deletePost(topic: string, uid: string, token: string) {
      return instance({
         url: "/content/posts/item",
         method: "post",
         data: { uid: uid, topic: topic },
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   deleteTopic(topic: string, token: string) {
      return instance({
         url: "/content/topics/item",
         method: "post",
         data: { topic },
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   deleteStoredPost(uid: string, token: string) {
      return instance({
         url: `/content/store/item`,
         method: "post",
         data: { postid: uid },
         headers: { "X-XSRF-TOKEN": token },
      });
   },

   checkIslogined(token: string) {
      return instance({
         url: "/api/check/status",
         method: "get",
         headers: { "token": `Bearer ${token}` },
      });
   },
};
