import {ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {useMemo} from "react";
import {onError} from 'apollo-link-error';
import {createUploadLink} from "apollo-upload-client";

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient() {

    const uploadLink = createUploadLink({uri: 'http://localhost:5000/graphql'})

    const errorLink: any = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
            console.log('graphQLErrors', graphQLErrors);
        }
        if (networkError) {
            console.log('networkError', networkError);
        }
    });


    const middleware = new ApolloLink((operation, forward) => {
        operation.setContext(({headers = {}}, cookies: any) => ({
            headers: {
                ...headers,
            },
            credentials: "include",
        }));
        return forward(operation);
    });

    const link = ApolloLink.from([errorLink, middleware, uploadLink]);

    const cache = new InMemoryCache();

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link,
        cache: cache,
        credentials: "include",
    });

}

export function initializeApollo(initialState = null) {

    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }

    if (typeof window === "undefined") return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}