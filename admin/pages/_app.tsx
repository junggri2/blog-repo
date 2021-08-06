// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import "react-app-polyfill/ie9";
// import "react-app-polyfill/ie11";
// import "react-app-polyfill/stable";
import React, { useEffect } from "react";
import { GlobalStyle } from "../styles/globalStyles";
import { AppProps } from "next/app";
import "../styles/highlight/atom-one-light.css";
import { Provider } from "react-redux";
import { store } from "@lib/store";
import { NextRouter, useRouter } from "next/router";
import checkUserState from "@lib/checkUserState";

function MyApp({ Component, pageProps }: AppProps) {
   const Router: NextRouter = useRouter();

   useEffect(() => {
      (async () => {
         const data: boolean = await checkUserState();
         if (!data) Router.push("/");
      })();
   }, []);

   return (
      <>
         <Provider store={store}>
            <GlobalStyle />
            <Component {...pageProps} />
         </Provider>
      </>
   );
}

export default MyApp;
