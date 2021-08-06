import React from "react";
import { StyledHomeNavBar } from "@components/styled";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";

const HomeNavBar: React.FC = () => {
   const route: NextRouter = useRouter();
   return (
      <StyledHomeNavBar>
         <nav>
            <Link href="/home/post">
               <div className={route.pathname === "/home/post" ? "active" : ""}>Post</div>
            </Link>
            <Link href='/home/store'>
               <div className={route.pathname === "/home/store" ? "active" : ""}>Store</div>
            </Link>
         </nav>
         <Link href="/write">
            <div className="write-btn">새글작성</div>
         </Link>
      </StyledHomeNavBar>
   );
};

export default HomeNavBar;