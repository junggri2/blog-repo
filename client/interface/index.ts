import {ReactNode} from "react";

export interface ApolloCache<T> {
   children?: ReactNode
   data: {
      ROOT_QUERY: {
         __typename: any
         [property: string]: T
      }
   }
}