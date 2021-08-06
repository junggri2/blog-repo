import React from 'react';
import {_postPage} from "@components/styled/entry";
import {initializeApollo} from "@hooks/useApolloclient";
import {IPostData} from "@interface/props";
import {GetStaticProps} from "next";
import {ApolloQueryResult} from "@apollo/client";
import {IPostPage} from "@interface/component";
import {GetPostQuery, GetPostsQuery} from "@query/index";


interface IContext {
    params: {
        postid: string
    }
}

const Post: React.FC = (): JSX.Element => {
    return (
        <_postPage>
            <section className="post-info">
                <h1>클래스 - 과연 클래스는 문법적 설탕일까?</h1>
                <h4>그래도 프토로타입이지만 새로운 패러다임</h4>
                <div className="divider"/>
                <div className="post-metadata">
                    <li>
                        <span>작성일</span>
                        <span>2021년 11월 2일</span>
                    </li>
                    <li>
                        <span>수정일</span>
                        <span></span>
                    </li>
                </div>
            </section>
            <section className="post-content">
                오늘 포스팅할 내용은 ES6에서 처음 소개된 클래스에 관하여 작성해 보려고합니다. 일단 자바스크립트는 클래스기반의 객체지향언어가 아닌 프로토타입의 객체지향언어입니다. 이에 클래스기반의
                객체지향언어를(자바 등)을 공부하신 분들이 프로토타입기반의 객체지향언어인 자바스크립트를 어렵게 느낀다고 합니다. 이에 자바스크립트에서는 클래스라는 문법을 지원했습니다. 하지만 클래스도
                또한 함수이며 프로토타입 기반으로 클래스를 구현할 수 있게해준 문법적 설탕이라고 할 수 있는데요. 하지만 단순히 클래스를 문법적 설명이라고 이야기 할 수 있을까요? 저는 단순히 문법적
                설탕이라고 말할 수 없을 것 같습니다. 아래의 코드와 설명을 보면서 왜 그런지 한번 보겠습니다.

                클래스를 문법적설탕으로 볼지 아닐지는 여러분들의 개인적인 의견인것 같습니다.
                위 코드를 살펴보면, 전자는 생성자함수로써 인스턴스를 생성하는 방법과 후자는 클래스를 사용하여 인스턴스를 생성하는 것을 볼 수 있는데요. 여기서 클래스안에 정의된 메소드인
                constructor을 확인할 수 있습니다. 먼저 집고 넘어가야할것이 있습니다. 클래스 내부에서는 정적, 프로토타입, constructor
                메서드를 정의할 수 있는데요. 첫번째로


                constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드 입니다. 위 코드의 1,2번 역활을 한다고 생각하시면 됩니다. constructor내부에서의 this는 생성자
                함수에서처럼 생성될 인스턴스를 가르키게 됩니다.


                이번에는 클래스내부에서 정의하는 프로토타입메서드를 살펴보도록 하겠습니다. 기존의 프로토타입 메서드를 정의하는 방식과 비교하며 코드를 살펴보도록 하겠습니다.
                위 코드를 살펴보면, 전자는 생성자함수로써 인스턴스를 생성하는 방법과 후자는 클래스를 사용하여 인스턴스를 생성하는 것을 볼 수 있는데요. 여기서 클래스안에 정의된 메소드인
                constructor을 확인할 수 있습니다. 먼저 집고 넘어가야할것이 있습니다. 클래스 내부에서는 정적, 프로토타입, constructor 메서드를 정의할 수 있는데요. 첫번째로
                constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드 입니다. 위 코드의 1,2번 역활을 한다고 생각하시면 됩니다. constructor내부에서의 this는 생성자
                함수에서처럼 생성될 인스턴스를 가르키게 됩니다.


                이번에는 클래스내부에서 정의하는 프로토타입메서드를 살펴보도록 하겠습니다. 기존의 프로토타입 메서드를 정의하는 방식과 비교하며 코드를 살펴보도록 하겠습니다.
            </section>
            <section className="post-user-interaction">
                <div>
                    <div className="like">좋아요</div>
                    <div className="dislike">싫어요</div>
                </div>
            </section>
            <section className="reply">
                <h1>{2}개의 댓글이 있습니다.</h1>
            </section>
        </_postPage>
    );
};

export default Post;

export const getStaticPaths = async () => {
    const apolloClient = initializeApollo();


    const {data}: ApolloQueryResult<IPostPage> = await apolloClient.query({query: GetPostsQuery});

    const paths = data.posts.map((e: IPostData) => ({
        params: {postid: e.uid}
    }));

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps = async (ctx: IContext) => {
    const apolloClient = initializeApollo();

    const {data}: ApolloQueryResult<IPostPage> = await apolloClient.query(
        {
            query: GetPostQuery,
            variables: {
                uid: ctx.params.postid
            }
        }
    );

    return {
        props: {data}
    };
};

