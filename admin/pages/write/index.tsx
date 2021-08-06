import React, { useCallback, useEffect, useRef, useState } from "react";
import { formats, modules } from "@config/editor.config";
import { ICommonModuleProps } from "@module/Common/common.interface";
import { ITextEditModuleProps } from "@module/TextEditor/textEdit.interface";
import { ITopicModuleProps } from "@module/Topic/topic.interface";
import { onSetTag } from "@module/TextEditor";
import useCSRF from "@useHooks/useCSRF";
import useTextEdit from "@useHooks/useTextEdit";
import useTopic from "@useHooks/useTopic";
import useCommon from "@useHooks/useCommon";
import { Snow } from "../../styles/snow";
import { EditorLeftSeciton, EditorRightSeciton } from "@components/styled";
import EditorContentName from "@components/editorContentName";
import SelectTopic from "@components/selectTopic";
import KindOfPost from "@components/kindofPost";
import Thumbnail from "@components/thumbnail";
import EditorBtnBox from "@components/editorBtnBox";
import { ITextEditRefObject } from "@lib/interface";
import { NextRouter, useRouter } from "next/router";
import { editorUtil } from "@lib/editorUtil";
import { fetcher } from "@lib/axios";
import validaitionInput from "@lib/validationInput";
import Detail from "@components/detail";


const Write = () => {
   const router: NextRouter = useRouter();
   const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;
   const textEdit = useRef<ITextEditRefObject>(null);
   const csrf: string | null = useCSRF();
   const [mode, setMode] = useState<string>("write");
   const { topicList, getTopicAndStoredPost }: ITopicModuleProps = useTopic();
   const { setNewRequset, login }: ICommonModuleProps = useCommon();
   const { data, setContent, setContentName, setTopic, setKindOfPosts, setDetail, setTempData, setThumbnail }: ITextEditModuleProps = useTextEdit();


   const setInLocalStorage = useCallback(() => {
      localStorage._td = JSON.stringify(data);
   }, [data]);

   const onContentChange = useCallback((data: string) => {
      setContentName(data);
   }, [setContentName]);

   const rteChange = useCallback((content: any, delta: any, source: any, editor: any) => {
      if (textEdit.current) setContent(textEdit.current.state.value);
   }, [setContent]);

   const onIsChecked = useCallback((name: string) => {
      setTopic(name);
   }, [setTopic]);

   const onCheckKindOfPosts = useCallback((kindOf: string) => {
      setKindOfPosts(kindOf);
   }, [setKindOfPosts]);

   const onDetailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setDetail(e.target.value);
   }, [setDetail]);

   const onChangeThumbnail = useCallback((img: string) => {
      setThumbnail(img);
   }, [setThumbnail]);

   const onChangeTag = useCallback((tags: string) => {
      onSetTag(tags);
   }, [onSetTag]);

   const onRequestAfterMakeOrDeleteTopic = useCallback(() => {
      getTopicAndStoredPost();
   }, [getTopicAndStoredPost]);


   const onClickSavePostBtn = async (): Promise<void> => {
      if (!validaitionInput(data)) return alert("정보를 입력하세요");
      if (Object.keys(router.query).length === 0) {
         await fetcher.saveNewPost(data, csrf);
      } else {
         const mode = Object.keys(router.query)[0];
         const identifier = Object.values(router.query)[0];
         if (mode === "update" && typeof identifier === "string") {
            await fetcher.updatePost(data, identifier, csrf);
         } else if (mode === "temp" && typeof identifier === "string") {
            await fetcher.deleteStorePostsAndMakeNewPost(data, identifier, csrf);
         }
      }
      setNewRequset(true);
      onRequestAfterMakeOrDeleteTopic();
      router.push("/home/post");
   };

   const onCLickStorePostBnt = async () => {
      if (data.contentName === "") return;
      const stored_uid = Object.values(router.query)[0];
      if (csrf) {
         const result = await fetcher.saveStoredPost(data, csrf, stored_uid as string);
         onRequestAfterMakeOrDeleteTopic();
         if (result.data.state) router.push("/home/store");
      }
   };

   useEffect(() => {
      onRequestAfterMakeOrDeleteTopic();
      if (textEdit.current) textEdit.current.focus();
      return editorUtil.initialData(setTempData);
   }, []);


   useEffect(() => {
      if (router.asPath !== "/write" && Object.keys(router.query).length !== 0) {
         const queryData = Object.entries(router.query);
         const mode = queryData[0][0];
         const identifier = queryData[0][1];
         if (mode === "update" && typeof identifier === "string") {
            const topic: string | string[] = queryData[1][1];
            if (typeof topic === "string") {
               editorUtil.handleDataFromMode(fetcher.getDataFromMode(identifier, topic), textEdit, setTempData);
            }
         } else if (mode === "temp" && typeof identifier === "string") {
            editorUtil.handleDataFromMode(fetcher.getDataFromMode(identifier), textEdit, setTempData);
         }
         setMode(mode);
      } else {
         setMode("write");
      }
   }, [router]);

   return (
      <>
         <Snow />
         <EditorLeftSeciton>
            <EditorContentName handleChangeContent={onContentChange} contentName={data.contentName} />
            <ReactQuill
               theme="snow"
               modules={modules}
               formats={formats}
               onChange={rteChange}
               placeholder="입력하기"
               ref={textEdit}
            />
         </EditorLeftSeciton>
         <EditorRightSeciton>
            <Detail onDetailChange={onDetailChange} data={data.detail} />
            <SelectTopic
               tables={topicList && topicList.tables}
               onIsChecked={onIsChecked}
               checked={data.topicName}
               onRequestAfterMakeOrDeleteTopic={onRequestAfterMakeOrDeleteTopic}
               token={csrf}
            />
            <KindOfPost onCheck={onCheckKindOfPosts} checked={data.kindofPosts} />
            <Thumbnail token={csrf} onChangeThumbnail={onChangeThumbnail} thumbnail={data.thumbnail} />
            <EditorBtnBox handleSubmit={onClickSavePostBtn} handleStored={onCLickStorePostBnt} />
         </EditorRightSeciton>
      </>
   );
};
export default Write;