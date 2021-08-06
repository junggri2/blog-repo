import React, { useMemo, useRef, useState } from "react";
import { StyledSelectTopic, StyledSelectTopicItem } from "@components/styled";
import { fetcher } from "@lib/axios";
import { AxiosResponse } from "axios";
import { ISelectTopic, Ref } from "@lib/interface";
import { MdDelete } from "react-icons/md";

export const SelectTopic: React.FC<ISelectTopic> = ({ ...props }): JSX.Element => {

   const [value, setValue] = useState<string>("");
   const parentRef = useRef<HTMLDivElement>(null);

   const topicList: React.RefObject<Ref>[] | undefined = useMemo(
      () => props.tables?.map(() => React.createRef(),
      ), [props.tables]);

   const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      props.onIsChecked(e.target.value);
   };

   const deleteTopic = async (e: React.MouseEvent, ref: { current: any }) => {
      if (window.confirm("토픽삭제하면 다 날라가면 어쩔려고?")) {
         const topic: string | undefined = (e.currentTarget as HTMLElement).dataset.topic;
         if (topic && props.token) {
            const { data }: AxiosResponse<{ state: boolean }> = await fetcher.deleteTopic(topic, props.token);
            data.state ? ref.current.style.display = "none" : alert("삭제하는데 오류가 났단말이지");
         }
      }
   };

   const createTopic = async (e: React.MouseEvent) => {
      if (!value) return;
      if (props.token && parentRef.current) {
         const { data } = await fetcher.createTopic(value, props.token);
         props.onRequestAfterMakeOrDeleteTopic();
         setValue("");
      }
   };

   const onChangeValue = (e: React.ChangeEvent) => {
      setValue((e.target as HTMLInputElement).value);
   };


   return (
      <StyledSelectTopic>
         <h1>토픽 선택하기</h1>
         <div className="select-item-box" ref={parentRef}>
            {props.tables && props.tables.map((e, i) => (
               <div className="select-items" ref={topicList[i]} key={e.topic}>
                  <StyledSelectTopicItem>
                     <input className="select-input" type="radio" id={e.topic} onChange={onChange}
                            value={e.topic} name='post' checked={e.topic === props.checked} />
                     <label className="select-label" htmlFor={e.topic}>{e.topic}</label>
                     <div className="deleteBtn-icons" data-topic={e.topic} onClick={(e) => deleteTopic(e, topicList[i])}>
                        <MdDelete />
                     </div>
                  </StyledSelectTopicItem>
               </div>
            ))}
         </div>
      </StyledSelectTopic>
   );
};
export default React.memo(SelectTopic);