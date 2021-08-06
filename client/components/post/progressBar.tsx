import React, { useEffect, useRef } from "react";

import _ from "lodash";
import { ProgressBarSc } from "@components/post/posts.styled";

export const ProgressBar = () => {
   const charge = useRef<HTMLDivElement>(null);


   const calcHeight = (e: Event) => {
      if (charge.current) {
         const percentage = Math.floor((window.scrollY) / (document.body.scrollHeight - document.body.clientHeight) * 100);
         charge.current.style.height = `calc(${percentage}%)`;
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", _.throttle(calcHeight, 50));
   }, []);
   return (
      <ProgressBarSc>
         <div className="charge" ref={charge} />
      </ProgressBarSc>
   );
};

export default ProgressBar;