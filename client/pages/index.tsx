import React from "react";
import useScreenWidth, {IScreenWidth} from "@hooks/useScreenWidth";
import {GetStaticProps} from "next";
import {initializeApollo} from "@hooks/useApolloclient";
import {EntryContainerComponent} from "@components/styled/entry";
import {ApolloCache} from "@interface/index";
import {IPostData} from "@interface/props";
import {gql, useMutation} from "@apollo/client";


export default function Home({data}: ApolloCache<IPostData[]>) {
    const {width}: IScreenWidth = useScreenWidth();
    // const posts = data.ROOT_QUERY.posts;ㅉㅉㅉㅉㅉㅉㅉㅉㅉ

    const test = gql`
        mutation test($file : Upload!){
            createImage(file :$file)
        }
    `
    const [create, data2] = useMutation(test)

    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files[0])
        create({})
    }

    const sendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = new FormData()
        data.append("img", e.target.files[0])
        create({variables: {file: e.target.files[0]}})
    }
    return (
        <EntryContainerComponent width={width}>
            {/*<Navbar/>*/}
            {/*<PostContainer*/}
            {/*    width={width}*/}
            {/*    posts={posts}*/}
            {/*/>*/}
            <input type="file"
                   onChange={(e) => sendImage(e)}
            />
        </EntryContainerComponent>
    );
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const apolloClient = initializeApollo();


    // await apolloClient.query({query: GetPostsQuery, variables: {uid: 'uid1'}});

    return {
        props: {
            data: apolloClient.cache.extract(),
        },
    };
};