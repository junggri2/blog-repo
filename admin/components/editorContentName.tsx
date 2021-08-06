import React, { ReactNode } from "react";
import { TextEditContentNameComp } from "@components/styled";

interface ITextEditContentName {
   handleChangeContent: (contentName: string) => void
   contentName: string
   children?: ReactNode
}

const EditorContentName: React.FC<ITextEditContentName> = ({ handleChangeContent, contentName }): JSX.Element => {

   const onContentName = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeContent(e.target.value);
   };
   return (
      <TextEditContentNameComp>
         <input type="text" name="content_name" placeholder="제목을 입력하세요." onChange={onContentName} value={contentName} />
      </TextEditContentNameComp>
   );
};

export default React.memo(EditorContentName);