import styled, {css} from "styled-components";
import {MutableRefObject} from "react";


const one_rem = 16;
const navigationWidth = 200;


const mediaQuery = css`
  @media (max-width: 1800px) {
    max-width: 1440px;
  }
  @media (max-width: 1440px) {
    max-width: 1080px;
  }
  @media (max-width: 1080px) {
    max-width: 720px;
  }
  @media(max-width:720px){
    width:100%;
  }
`;


const eclipse = css`
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const EntryContainerComponent = styled.section<{ width: number }>`
  font-size: 0;
  width: ${props => props.width + "px"};
  max-width: ${props => props.width + "px"};
  margin: 0 auto;
  height: 2000px;
  position: relative;
  ${mediaQuery};
`;

export const _navbar = styled.nav`
  font-size: 1rem;
  z-index: 2;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(4px);
  height: 55px;
  position: fixed;
  top: 0;
  width: inherit;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    border: 1px solid black;
    width: 100px;
    height: inherit;
  }

  ${mediaQuery};
`;

export const _postContainer = styled.section<{ width: number, ref: MutableRefObject<HTMLTableSectionElement> }>`
  padding-top: 100px;
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  
  article {
    margin: 1rem;
    width: ${props => props.width / 5 - 32 + "px"};

    & .post-info {
      background: rgba(252, 253, 251, 1);
      box-shadow: rgb(0 0 0 / 5%) 0px 6px 18px 0px;
      border: 1px solid rgba(0, 0, 0, 0.02);
      border-radius: 5px;
      height: 100%;
      position: relative;
      transition: 0.3s all;

      &:hover {
        box-shadow: rgb(0 0 0 / 9%) 0px 7px 19px 0px;
        cursor: pointer;

        & .img-mask {
          backdrop-filter: blur(4px);
        }
      }
    }

    height: 400px;
    max-height: 400px;
    position: relative;

    & .post-info-img {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      position: relative;

      & .img-mask {
        transition: 0.2s all;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
      }
    }

    & .post-info-content {
      margin-top: 14px;
      padding: 0 16px;

      h1 {
        font-size: 1.15rem;
        font-weight: bolder;
        ${eclipse};
        line-height: 1.5;
        font-family: inherit;
        //display: -webkit-box;
        //-webkit-box-orient: vertical;
        //-webkit-line-clamp: 1;
      }

      h4 {
        margin-top: 5px;
        line-height: 1.65;
        font-family: inherit;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        color: rgba(0, 0, 0, 0.7);
      }
    }

    & .post-info-metadata {
      display: flex;
      color: rgba(0, 0, 0, 0.7);
      align-items: center;
      font-size: 13px;
      position: absolute;
      bottom: 0;
      height: 30px;
      width: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding: 0 16px;
      justify-content: space-between;

      span:nth-child(2) {
        display: flex;
        letter-spacing: 4px;
      }
    }
  }
`;

export const _postPage = styled.article`
  width: 830px;
  margin: 0 auto;
  margin-top: 120px;

  & .post-info {
    h1 {
      font-size: 3rem;
      font-weight: 900;
      word-break: break-all;
      white-space: pre-wrap;
    }

    h4 {
      margin-top: 30px;
      font-size: 1.2rem;
    }

    & .divider {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      margin-top: 18px;
    }

    & .post-metadata {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;

      li:nth-child(1) {
        span:nth-child(1) {
          font-weight: 600;
          margin-right: 7px;
        }
      }
    }
  }

  & .post-content {
    margin-top: 60px;
    font-size: 1.1rem;
    line-height: 2.1;
    word-break: break-all;
    white-space: pre-wrap;
    letter-spacing: 0.2px;
  }

  & .post-user-interaction {
    margin-top: 40px;

    div:nth-child(1) {
      display: flex;

      div {
        border: 1px solid black;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
  }

  & .reply {
    //border: 1px solid black;
    margin-top: 40px;
  }
`;