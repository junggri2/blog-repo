import {ReactFC} from '@interface/common.interface';
import React from 'react';
import Image from "next/image";
import {FaRegSmile} from "react-icons/fa";

interface IPostItem extends ReactFC {

}

const PostItem: React.FC<IPostItem> = (): JSX.Element => {
    return (
        <article>
            <section className="post-info">
                <div className="post-info-img">
                    <div className="img-mask"/>
                    <Image src="/images/next.svg" width="200" height="100" layout="responsive"/>
                </div>
                <section className="post-info-content">
                    <h1>첫 취업성공 후 느끼는 점 혹은 감정?성공 후 느끼는 점 혹은 감정?</h1>
                    <h4>약 3주전? 여전히 내가 블로그디자인수정이나 정보를 얻을때 개발자들이 많이 애용하는 벨로그(velog)글들을 읽고 있었다. 요즘에 내가 canvas api에 관심이
                        많았던 지라 우연히 디자인관련 글들을 일게 되었는데, 그것이 내가 첫 취업을 하게된 계기가 되었다. 비전공자로 대학교 졸업시에 AR(증강현실)에 관하여 논문을
                        작성한적이 있었는데, 그때의 경험이 증강현실의 가능성을 그나마 조금은 알 수 있게된 계기였었다. 그렇게 내가 다시는 증강현실에 관한 업무를 하게 될줄을
                        몰랐는데,</h4>
                </section>
                <div className="post-info-metadata">
                    <span>2012년 11월 11일</span>
                    <span>2<FaRegSmile/></span>
                </div>
            </section>
        </article>
    );
};

export default PostItem;