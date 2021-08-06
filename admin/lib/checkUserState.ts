import { fetcher } from "@lib/axios";

export default async function checkJwtToken() {
   const token = localStorage.getItem("_jt");

   if (typeof token === "string") {
      const { data } = await fetcher.checkIslogined(token);
      return !!data;
   } else if (!token) {
      return false;
   }
};