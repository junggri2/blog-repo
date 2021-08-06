import {DocumentNode, gql} from "@apollo/client";

interface IParams<T> {
    type: T
    fragment?: DocumentNode | null
}

export class GQLBuilder {
    static querys: {} = {};


    static create<T>(method, queryName, body, params: IParams<T> | null = null) {


        const frag = params.fragment ? {...params.fragment} : ""

        let _query = params
            ? gql`
                ${method} gql{
                    ${queryName} {
                        ${body}
                    }
                }
            `
            : gql`
                ${method} gql($params : ${params.type}){
                    ${queryName} (params : $params) {
                        ${body}
                    }
                }
            `


        this.querys[queryName] = _query;

        return _query;
    }
}