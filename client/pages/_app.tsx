import GlobalStyles from "@styles/GlobalStyles";
import Head from "next/head";
import React from "react";
import {RecoilRoot} from "recoil";
import "../styles/highlight/atom-one-light.css";
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "@hooks/useApolloclient";


function App({Component, pageProps}) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <RecoilRoot>
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport"/>
                    <meta charSet="utf-8"/>
                </Head>
                <GlobalStyles/>
                <Component {...pageProps} />
            </RecoilRoot>
        </ApolloProvider>
    );
}

export default App;
