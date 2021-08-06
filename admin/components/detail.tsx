import React from "react";

interface IDetail {
   onDetailChange: (e) => void
   data: string
}


const Detail: React.FC<IDetail> = ({ ...props }): JSX.Element => {
   return (
      <div className="detail">
         <h1>요약을 작성해주세요.</h1>
         <input type="text" name="content_detail" placeholder="요약을 작성하세요." className="summary" onChange={props.onDetailChange} value={props.data} />
      </div>
   );
};
export default React.memo(Detail);