import styled from "styled-components";


export const StyledAdminContainer = styled.div`
  h1{
    font-size:3rem;
    margin-bottom: 40px;
    font-weight: bolder;
  }
  position: absolute;
  top:40%;
  left:50%;
  width:500px;
  transform: translate(-50%,-50%);
  & .auth__inputBox{
    display: flex;
    flex-direction: column;
    input{
      border:1px solid rgba(0,0,0,0.2);
      border-radius: 5px;
      padding:12px;
      margin-bottom: 15px;
      font-size:15px;
    }
  }
  & .certification__box{
    display: none;
    align-content: center;
    margin-top:15px;
    input{
      display: inline-block;
      padding:8px;
      border:1px solid rgba(0,0,0,0.2);
      border-radius: 0;
      outline-style: none;
      width:150px;
    }
    div{
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding:0 10px;
      background: #6699FF;
      color:white;
    }
  }
  & .login__btn{
    text-align: center;
    padding:15px 0;
    border-radius: 5px;
    color: white;
    font-size:1.125rem;
    background: #6699FF;
    cursor:pointer;
    margin-top:20px
  }
`;

export const StyledHomeComp = styled.div`
  //border:1px solid red;
  width:1000px;
  position: relative;
  margin:0 auto;
  padding-top:40px;
  h1{
    font-size:2rem;
    font-weight: bolder;
    padding-bottom:15px;
    border-bottom:1px solid rgba(0,0,0,0.2);
  }
  & .select-topic{
    margin-top:20px;
    & .select-topic-dropbox{
      display: flex;
      align-items: center;
      select{
       width:120px;
      }
      span{
        font-size:1.2rem;
        margin-right:20px;
      }
    }
  }
`;

export const StyledHomeNavBar = styled.div`
  margin-top:40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .write-btn{
   border:1px solid rgba(0,0,0,0.1);
   padding:6px 10px 4px 10px;
   border-radius:4px;
   cursor:pointer;
   background: #6699FF;
   color:white;
  }
  nav{
    display: flex;
    div{
      cursor:pointer;
      font-size:1.125rem;
      margin-right: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      &.active{        
        text-decoration: underline;
        text-underline-offset: 7px;
        text-decoration-color: #6699FF;
        text-decoration-thickness: 3px;
      }
    }
  }
`;

export const StyledPostContainer = styled.div`
  margin-top:40px;
  nav{
    margin-bottom:45px;
    border-radius: 5px;
    background-color:rgb(254,207,12);
    border:1px solid rgba(0,0,0,0.2);
    display: flex;
    font-size:1.125rem;
    font-weight: bold;
    li{
      padding:15px 0;
      text-align: center;
      &.list-name{
        width:calc(100% - 280px);
        border-right:1px solid rgba(0,0,0,0.2);
      }
      &.list-num{
        width:60px;
        border-right:1px solid rgba(0,0,0,0.2);
      }
      &.list-created{
        width:200px;
        border-right:1px solid rgba(0,0,0,0.2);
      }
      &.list-comment{
        width:50px;
      }
    }
  }
  & .post__control_box{
    margin-top:20px;
    margin-bottom:35px;
    display: flex;
    justify-content: space-between;
    select{
      margin-right:20px;
    }
    & .post_meta_control_box{
      display: inline-block;
      span{
        border:1px solid rgba(0,0,0,0.2);
        display: inline-block;
        padding:5px 10px;
        border-radius: 4px;
        margin-left:15px;
        cursor:pointer;
        background-color:rgb(254,207,12);
     }
    } 
  }
`;

export const StyledPostItems = styled.div`
  display: flex;
  border:2px solid rgba(0,0,0,0.4);
  border-radius: 4px;
  li{
    padding:15px 0;
    text-align: center;
    //background:rgb(254,207,12);
    &.list-name{
      width:calc(100% - 280px);
      border-right:1px solid rgba(0,0,0,0.2);
    }
    &.list-num{
      width:60px;
      border-right:1px solid rgba(0,0,0,0.2);
    }
    &.list-created{
      width:200px;
      border-right:1px solid rgba(0,0,0,0.2);
    }
    &.list-comment{
      width:50px;
    }
  }
  &:hover{
    background-color:rgb(254,207,12);
    cursor:pointer;
  }
`;

export const StyledManagePost = styled.div`
  position: relative;
  article{
  border:1px solid black;
  width:700px;
  margin:0 auto;
  position: relative;
  padding-bottom: 30px;
  background: white;
  tab-size: 1;
  & .posts-container-iconbox{
    padding:20px 20px;
    font-size:1.5rem;
  }
  & img{
    height:auto;
    width:auto;
    max-height: 600px;
    position: relative;
    margin :0 auto;
  }
  & .posts-name{
    padding-top:50px;
    font-size:3.3rem;
    text-align: center;
    font-weight: bold;
    white-space: pre-wrap;
    word-break: break-all;
  }
  & .posts-detail{
    text-align: center;
    margin-top:25px;
    font-size:1.4rem
  }
  & .posts-content{
    word-break:break-all;
    font-size:1.2rem;
    margin-top:50px;
    span{
      padding:1.5px 3.2px;
      border-radius: 5px;
    }
    a {
      color:#6699FF !important;
      text-decoration: underline;
      span{
        color:#6699FF !important;
      } 
    }
    & *{
      white-space: pre-wrap;
      word-break: break-all;
      line-height: 2.1;
      word-spacing: 1.2px;
      letter-spacing: 0.2px; 
    } 
    & p br{
      display: block;
      content: "";
      padding:10px 0;
    }
    blockquote{
      padding:4px 13px;
      border-left:4px solid #6699FF;
      background: #FBFCFD; 
    }
    p,ol,blockquote,span{
      color:black
    }
  }
  & .posts-created{
    margin-top: 60px;
    text-align: right;
    font-size:1rem;
    font-weight:100;
  }
  & .ql-syntax{
    padding:15px;

   }  
  }
  & .control-box{
    border:1px solid red;
    position:absolute;
    width:100px;
    right:0
  }
`;

export const EditorLeftSeciton = styled.div`
  width:50%;
  display: inline-block;
  height: 100vh;
  overflow: scroll;
  & .write-btn-box-container{
    position:absolute;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background:white;
    & .btn-box{     
      position: absolute;
      right:8%;
      cursor:pointer;
    }
    button{
      padding:13px 19px;
      border-radius: 4px;
      margin-left:20px;
      color: white;
      font-weight: 500;
      border:none;
      box-shadow: 0 0 4px rgba(0,0,0,0.2);
      letter-spacing: 0.4px;
      background:  #6699FF;
      cursor:pointer;
    }
  }
`;

export const TextEditContentNameComp = styled.div`
  input{
    border:none;
    width:100%;
    font-size:3rem;
    outline-style: none;
    padding:20px 20px;
    height: 120px;
    max-height: 120px;
    font-weight: bolder;
    &::placeholder{
      font-size:3rem;
      opacity:0.7;
    }
  }
  & .summary_content{
    h1{
      font-size:2rem;
      margin-top:20px;
    }
    input{
    font-size:1.125rem;
    &::placeholder{
      font-size:1.12rem;
      }
    }
  }
`;

export const EditorRightSeciton = styled.div`
  width:50%;
  float:right;
  padding:50px;
  padding-bottom: 100px;
  overflow: scroll;
  height: 100vh;
  background: rgb(248 249 250);
  & .detail{
    h1{
      font-size:1.4rem;
      font-weight: bolder;
    };
    input{
      margin-top:15px;
      border:none;
      padding:10px 0;
      width:100%;
      outline-style: none;
      font-size:1.2rem;
      font-weight: 500;
      &::placeholder{
        font-size:1.2rem;
        font-weight: bolder;
      }
    }
  }
  & .show__alert-box{
    position: absolute;
    top:30px;
    right:40px;
    padding:20px 40px;
    background:  #6699FF;
    color:white;
    font-size:1.2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    opacity: 0;
    transition: 0.3s ease-in-out;
  }
`;

export const StyledSelectTopic = styled.div`
  margin-top:30px;
  h1{
    font-size:1.4rem;
    margin-bottom:15px;
    font-weight: bolder;
  }
  & .select-item-box{
    max-height: 300px;
    overflow-y: scroll;
  }
   & .select-items{
    position:relative;
    display: flex;
    align-items: center;
    margin-bottom:14px;
    width:150px;
   }
   & .make_new_topic_box{
    margin-top:10px;
    width:200px;
    display: flex;
    align-items: center;
    position: relative;
    input{
      border:1px solid rgba(0,0,0,0.2);
      padding:7px;
      margin-right: 10px;
      outline-style:none;
    }
    div{
      position: absolute;
      height: 100%;
      right:0;
      padding:7px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: #6699FF;
      color:white;
    }
   }  
`;

export const StyledSelectTopicItem = styled.div`
  position:relative;
  width:120px;
  padding:0;
  display: flex;
  align-items: center;
  & .select-input{
    display: inline-block; 
    width:15px;
    height: 15px;
    margin-right: 15px;
  }
  & .select-label{
    font-weight: 300;
    margin-top: -1px;
    font-size:120%;
    cursor: pointer;
  }
   & .deleteBtn-icons{    
    position: absolute;
    right:0;
    font-size:1.3rem;
    margin-left:15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    opacity: 0;
    &:hover{
     opacity:1;
     cursor: pointer;
    }
  }
`;

export const StyledKindOfPost = styled.div`
  margin-top:30px;
  h1{
    font-size:1.4rem;
    font-weight: bolder;
    margin-bottom:20px;
  }
`;

export const StyledKindOfPostItem = styled.div`
  padding:0;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  & .select-input{
    display: inline-block;
    width:15px;
    height: 15px;
    margin-right: 15px;
  }
  & .select-label{
    font-weight: 300;
    margin-top: -1px;
    font-size:120%;
    cursor: pointer;
  }
`;

export const StyledThumbnail = styled.div`
  margin-top:30px;
  input{
    display: none;
  }
  h1{
    font-size:1.4rem;
    font-weight: bolder;
    margin-bottom:20px;
  }
  h2{
    font-size:1.125rem;
    margin-top:10px;
    font-weight: 600;
    color:#ff6b6b;
  }
  & .thumbnail-imgbox{
    margin-top:20px;
    max-height: 400px;
    position:relative;
    overflow-y: scroll;
    width:400px;
    height: 200px;
    img{
      object-fit: contain;
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height: 100%;
    }
  }
  & .thumbnail-btn,
  & .select__preview-thumbnail{
    margin-top:20px;
    display: inline-block;
    padding:10px;
    background-color:rgb(254,207,12);
    border:1px solid rgba(0,0,0,0.1);
    cursor: pointer;
    margin-right: 15px;
    border-radius: 5px;
  }
  & .savedImg__box{
    display: none;   
    margin-top:20px;
    border:1px solid rgba(0,0,0,0.2);
    padding:10px;
    border-radius: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
    & .savedImg__items{
      margin-bottom:30px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      img{
        width:150px;
        height: 150px;
        border:1px solid black
      }
      input{
        display: block;
        margin-top:15px;
      }
    }
  }
`;

export const StyledEditorBtnBox = styled.div`
  background: inherit;
  position: absolute;
  bottom:0;
  width:50%;
  right:0;
  display: flex;
  justify-content: flex-end;
  padding-bottom:20px;
  padding-right: 60px;
  button{
    padding:10px 20px;
    margin-right: 15px;
    cursor: pointer;
    background-color:rgb(254,207,12);
    border-radius: 2px;
    border:1px solid rgba(0,0,0,0.2);
    &:hover{
      transform: rotate(10deg);
    }
  }
`;

export const StyleStorePostList = styled.div`
  padding-top:40px;
  & .control-box{
    margin-top:15px; 
    display: flex;
    justify-content:flex-end;
    margin-bottom: 30px;
    button{
      border:1px solid rgba(0,0,0,0.2);
      border-radius: 3px;
      padding:5px 10px;
      cursor: pointer;
    }
  }
`;

export const StyleStorePostItem = styled.div`
  //border:1px solid red;
  cursor:pointer;
  border:1px solid rgba(0,0,0,0.2);
  padding:14px 10px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .idx{ 
    font-size:1.2rem;
  }
  & .store__postname{
    width:calc(100% - 120px);
    padding-left:20px;
    font-size:1.2rem;
    text-align: left;
  }
  & .created{
    width:120px;
    text-align: right;
  }
`;