import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({ href, children, activeClassName }) => {
   const router = useRouter();
   let className = children.props.className || "";
   console.log(className);
   if (router.pathname === href) {
      className = `${className} ${activeClassName}`;
   }

   return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export default ActiveLink;