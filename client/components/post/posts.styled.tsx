import styled from "styled-components";

export const ProgressBarSc = styled.div`
  height: 100%;
  width:8px;
  position: fixed;
  left:0;
  top:0;
  @media(max-width:800px){
    width:6px;
  }
  @media(max-width:500px){
    width:4px;
  }
  & .charge{
    transition: 0.1s all;
    width:100%;
    position: absolute;
    background: linear-gradient(to bottom, #fbcac9, #8ca6ce);
  }
`;

export const PostStateComponent = styled.div`
  margin-top:40px;
  h1{
    font-size:1.4rem;
    font-weight: bold;
    display: inline-block;
    background: linear-gradient(to right, #fbcac9, #8ca6ce);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;;
  }
  h2{
    font-size:1rem;
    margin-top:5px;
    display: inline-block;
    margin-left:10px;
  }
  ul{   
    display: flex;
    margin-top:20px;
    li{
      border:2px solid #E1E4E7;
      color:#E1E4E7;
      font-size:2rem;
      display: flex;
      margin-right:15px;
      padding:7px;
      border-radius: 50%;
      cursor:pointer;
      transition: 0.2s all;
      box-shadow: 0px 4px 8px rgba(0,0,0,0.06);
      img{
        width:30px;
        height: 30px;
        user-select: none;
      }
    };
    & .click_like{
      border:2px solid #00C854;
    }
    & .click_dislike{
      border:2px solid #ff6b6b;
    }
    & .like:hover{
   
      border:2px solid #00C854;
    }
    & .dislike:hover{
      border:2px solid #ff6b6b;
    }
  }
`;