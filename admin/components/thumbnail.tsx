import React, { useRef, useState } from "react";
import { StyledThumbnail } from "@components/styled";
import { ImgRef, IThumbNail, IThumbnailFetchData } from "@lib/interface";
import { AxiosResponse } from "axios";
import { fetcher } from "@lib/axios";

export const Thumbnail: React.FC<IThumbNail> = ({ token, onChangeThumbnail, thumbnail }): JSX.Element => {
   const imgRef: React.RefObject<ImgRef> = useRef(null);
   const btnRef = useRef<HTMLInputElement>(null);
   const prevImgBox = useRef<HTMLTableSectionElement>(null);
   const [savedImg, setSavedImg] = useState<string[] | null>(null);

   const onChangeImg = async (e: any) => {
      if (imgRef.current && token) {
         const formData = new FormData();
         const target = e.target as HTMLInputElement;
         const file: File = (target.files as FileList)[0];

         imgRef.current.src = URL.createObjectURL(file);
         formData.append("file", file);
         const { data }: AxiosResponse<IThumbnailFetchData> = await fetcher.saveThumbnail(token, formData);
         onChangeThumbnail(data.filename);
      }
   };

   const onClickBtn = () => {
      if (btnRef.current) btnRef.current.click();
   };

   const onClickPreviewThumbnailBtn = async () => {
      const { data }: AxiosResponse<string[]> = await fetcher.getSavedImg();
      if (prevImgBox.current) {
         prevImgBox.current.style.display = "flex";
         setSavedImg(data);
      }
   };

   const onChangeFromSavedImg = (e: React.ChangeEvent) => {
      if (prevImgBox.current) {
         onChangeThumbnail(e.target.id);
         prevImgBox.current.style.display = "none";
      }
   };

   return (
      <StyledThumbnail>
         <h1>포스트 미리보기</h1>
         <input type="file" name="file" accept="image/*" multiple onChange={onChangeImg} ref={btnRef} />
         <h2>이미지 저장할때 jpg, png로 저장해야한다 svg는 사용할 수 없다는 거 알지?</h2>
         <section className="thumbnail-imgbox">
            <img ref={imgRef}
                 src={process.env.NODE_ENV === "development"
                    ? "/images/Logo.svg"
                    : thumbnail
                       ? `https://www.junggri.com/thumbnail/${thumbnail}`
                       : "/images/Logo.svg"} alt="썸네일" />

         </section>
         <div className="thumbnail-btn" onClick={onClickBtn}>썸네일 선택하기</div>
         <div className="select__preview-thumbnail" onClick={onClickPreviewThumbnailBtn}>사진 선택하기</div>
         <section className="savedImg__box" ref={prevImgBox}>
            {savedImg?.map((e) =>
               <div key={e} className="savedImg__items">
                  <label htmlFor={e}>
                     <img src={process.env.NODE_ENV === "development"
                        ? "/images/Logo.svg"
                        : `https://www.junggri.com/thumbnail/${e}`}
                          alt="썸네일" />
                  </label>
                  <input type="checkbox" id={e} onChange={onChangeFromSavedImg} />
               </div>,
            )}
         </section>
      </StyledThumbnail>
   );
};

export default React.memo(Thumbnail);