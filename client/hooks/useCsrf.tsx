import React, {useEffect, useState} from "react";
import fetcher from "utils/fetcher";


function CSRF() {
   const [csrf, setCsrf] = useState<string | null>(null);

   useEffect(() => {
      (async () => {
         const {data} = await fetcher.getCSRTtoken();
         setCsrf(data)
      })();
   }, []);
   return csrf;
}

export default CSRF;