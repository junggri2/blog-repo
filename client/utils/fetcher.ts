import instance from "@config/axios.config";
import {ICommentDeletDataProps, IContactData, ISaveCommentProps} from "@interface/comment.interface";
import {ITextInitialProps} from "@interface/textEditor.interface";

const fetcher = {
    getSavedImg() {
        return instance({
            url: "/content/imgs",
            method: "get",
        });
    },

    getPostFromPostId(postsId: string) {
        return instance({
            url: `/content/posts/item/${postsId}`,
            method: "get",
        });
    },

    getAllPosts(state: string) {
        return instance({
            url: `/content/posts/items/state/${state}`,
            method: "get",
        });
    },

    getPostForPagination(page: number, offset: number) {
        return instance({
            url: `/content/posts/items/page/${page}/offset/${offset}`,
            method: "get",
        });
    },

    getDataFromMode(identifier: string, topic?: string) {
        const URL: string = topic === undefined
            ? `/content/items/${identifier}`
            : `/content/items/${identifier}/topics/${topic}`;

        return instance({
            url: URL,
            method: "get",
        });
    },


    getTopicAndTempPostsData() {
        return instance({
            url: "/content/topics/temps",
            method: "get",
        });
    },


    savePost({data, csrf}: { data: ITextInitialProps, csrf: string }) {
        return instance({
            url: `/content/post`,
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": csrf},
        });
    },

    saveTemporaryPost(data: ITextInitialProps, csrf: string, temp_id?: string) {
        return instance({
            "url": "/content/temp",
            method: "post",
            data: {data: data, uid: temp_id},
            headers: {"X-XSRF-TOKEN": csrf},
        });
    },

    deleteTemporaryPostAndSavePost(data: ITextInitialProps, identifier: string, token: string) {
        return instance({
            url: `/content/${data.topicName}/temps/${identifier}`,
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    updatePost(data: ITextInitialProps, identifier: string, token: string) {
        return instance({
            "url": `/content/${data.topicName}/posts/${identifier}`,
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    handlePostState(postState: number, topic: string, uid: string, token: string) {
        return instance({
            url: "/content/posts/state",
            method: "post",
            data: {isOpen: postState, topic, uid},
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    createTopic(topic: string, token: string) {
        return instance({
            url: `/content/topics`,
            method: "post",
            data: {topic: topic},
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    deleteTopic(topic: string, token: string) {
        return instance({
            url: "/content/topics/item",
            method: "post",
            data: {topic: topic},
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    deleteTemporaryPost(post_id: string, token: string) {
        return instance({
            url: `/content/temps/item`,
            method: "post",
            data: {postid: post_id},
            headers: {"X-XSRF-TOKEN": token},
        });

    },

    deletePost(topic: string, identifier: string, token: string) {
        return instance({
            url: "/content/posts/item",
            method: "post",
            data: {uid: identifier, topic: topic},
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    preloadGetPost(topic: string, postsId: string) {
        return instance({
            url: `/content/preload/${encodeURIComponent(topic)}/posts/${postsId}`,
            method: "get",
        });
    },


    saveThumbnail(token: string, data: any) {
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

    getComment(postid: string) {
        return instance({
            url: `/comment/comments/comment/posts/${postid}`,
        });
    },

    saveComment(data: ISaveCommentProps, token: string) {
        return instance({
            url: "/comment/comments",
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    saveReply(data: any, token: string) {
        return instance({
            url: "/comment/reply",
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": token},
        });
    },


    deleteComment(data: ICommentDeletDataProps, token: string) {
        return instance({
            url: "/comment/comments/items",
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    getPostFromParams(parmas: string) {
        return instance({
            url: `/content/posts/${encodeURIComponent(parmas)}`,
            method: "get",
        });
    },

    adminLogin(data: any, token: string) {
        return instance({
            url: "/api/login",
            method: "post",
            data: {data},
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    getCSRTtoken() {
        return instance({
            url: "/csrf",
        });
    },

    getGACount() {
        return instance({
            url: "/api/google/count",
            method: "get",
        });
    },

    setJwtToken(token: string) {
        return instance({
            url: "/api/token",
            method: "post",
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    checkStatus(token: string) {
        return instance({
            url: "/api/check/status",
            method: "get",
            headers: {"token": `Bearer ${token}`},
        });
    },

    sendContactMsg(token: string, data: IContactData) {
        return instance({
            url: "/admin/contact",
            method: "post",
            data: data,
            headers: {"X-XSRF-TOKEN": token},
        });
    },

    postState(token: string, state: string, uid: string, howToChange: string) {
        return instance({
            url: "/content/state",
            method: "post",
            data: {state, uid, howToChange},
            headers: {"X-XSRF-TOKEN": token},
        });
    },
};

export default fetcher;