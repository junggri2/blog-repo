import React, { useEffect, useRef, useState } from "react";
import { StyledAdminContainer } from "@components/styled";
import { fetcher } from "@lib/axios";
import useCSRF from "@useHooks/useCSRF";
import { AxiosResponse } from "axios";
import { NextRouter, useRouter } from "next/router";
import checkUserState from "@lib/checkUserState";

interface IAmdinData {
   id: string | null,
   pwd: string | null
}


export default function Home() {
   const router: NextRouter = useRouter();
   const token: string | null = useCSRF();
   const certifiInputRef = useRef<HTMLInputElement>(null);
   const cerificationBox = useRef<HTMLDivElement>(null);

   const [certificationNumber, setcertificationNumber] = useState<number>(0);
   const [adminData, setAdminData] = useState<IAmdinData>({
      id: "",
      pwd: "",
   });

   const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setAdminData({
         ...adminData,
         [e.target.name]: e.target.value,
      });
   };

   const checkAuth = async () => {
      const { data }: AxiosResponse = await fetcher.authIsAdmin(token, adminData.id, adminData.pwd);

      if (data.state && cerificationBox.current && certifiInputRef.current) {
         setcertificationNumber(data.certificationNum);
         cerificationBox.current.style.display = "flex";
         certifiInputRef.current.focus();
      } else {
         setcertificationNumber(null);
      }
   };

   const onClickLoginBtn = async () => {
      if (certificationNumber === Number(certifiInputRef.current.value)) {
         const { data }: AxiosResponse<string> = await fetcher.getJwtToken();
         setcertificationNumber(null);
         setAdminData({ id: "", pwd: "" });
         localStorage.setItem("_jt", data);
         await router.push("/home/post");
      }
   };

   useEffect(() => {
      (async () => {
         const data: boolean = await checkUserState();
         if (data) router.push("/home/post");
      })();

   }, []);

   return (
      <StyledAdminContainer>
         <h1>로그인</h1>
         <section>
            <div className="auth__inputBox">
               <input type="text" name="id" placeholder="아이디" value={adminData.id} onChange={onChange} />
               <input type="password" name="pwd" placeholder="비밀번호" value={adminData.pwd} onChange={onChange} />
            </div>
            <div className="certification__box" ref={cerificationBox}>
               <input type="text" ref={certifiInputRef} maxLength={6} />
               <div onClick={onClickLoginBtn}>
                  <span>인증하기</span>
               </div>
            </div>
            <div onClick={checkAuth} className="login__btn">로그인</div>
         </section>
      </StyledAdminContainer>
   );
}
