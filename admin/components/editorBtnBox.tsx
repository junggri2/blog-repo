import React from "react";
import { StyledEditorBtnBox } from "@components/styled";

interface IEditorBtnBox {
   handleSubmit: () => void
   handleStored: () => void
}

export const EditorBtnBox: React.FC<IEditorBtnBox> = ({ ...props }): JSX.Element => {
   return (
      <StyledEditorBtnBox>
         <button onClick={props.handleStored}>임시저장</button>
         <button onClick={props.handleSubmit}>게시하기</button>
      </StyledEditorBtnBox>
   );
};

export default React.memo(EditorBtnBox);