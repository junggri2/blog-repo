import React, { useEffect, useState } from "react";
import { fetcher } from "@lib/axios";
import { AxiosResponse } from "axios";

const CSRF = (): string | null => {
   const [csrf, setCsrf] = useState<null | string>(null);

   useEffect(() => {
      (async () => {
         const { data }: AxiosResponse<string> = await fetcher.getCsrfToken();
         setCsrf(data);
         return () => setCsrf(null);
      })();
   }, []);

   return csrf;
};

export default CSRF;