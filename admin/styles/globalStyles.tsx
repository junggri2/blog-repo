import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { media } from "./Media";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing:border-box;
  }
  body,html{
   font-size:14px;
   font-family: 'Avenir', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif;
   color:#333333;
   position:relative;
   height:100%;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: auto;
   }
  a{
        text-decoration:none;
        color:inherit;
        cursor: pointer;
    }
    ol, ul, li {
        list-style: none;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    input, button {
        background-color: transparent;
    }
    h1, h2, h3, h4, h5, h6 {
    font-family:'Maven Pro', sans-serif;
    }
  
    b { 
       font-weight: bold !important; 
    }
    i { 
       font-style : italic;
    }
    .quill{
     position:relative;
     height:calc(100% - 120px);
     overflow: scroll; 
     border:none;
    }
    .ql-toolbar.ql-snow{
      border:none !important;
      box-shadow: none !important;
    }
    .ql-container.ql-snow{
      position: relative;     
      height: 90%;
      border: none !important;
      padding-top:10px;
    }
    .ql-size-huge{
        font-size:4rem !important;
    }
    .ql-editor .ql-syntax{
        background: rgb(248 249 250) !important;
    }
    .ql-syntax{
      font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      padding:25px 25px; 
      letter-spacing: 0.2px;
      border-radius: 4px;
      font-size: 0.9rem;
      background: #FBFCFD;
      font-weight: 300 !important;
      white-space: pre-wrap;
      tab-size: 1 !important;
     & span{
        font-weight:300 !important;
        ${media.mobile`
         white-space: pre !important;
       `};
      }
    }
    .ql-snow .ql-editor pre.ql-syntax{
      color:black !important;
     }
    .ql-toolbar.ql-snow{
        border-left:none;
        border-right:none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }   
    .ql-editor blockquote{
      padding:10px 20px;
      border-left:5px solid #f58320 !important;
      background: rgb(248 249 250);
    }
    .hljs-params,.hljs-attr{
      color:rgb(36, 41, 46) !important;
    }
    .ql-syntax .hljs-tag{
      color:black;
      & .hljs-name{
        color:#a626a4 !important;
      }
      & .hljs-attr{
        color: #4078f2 !important;
      } 
    }
    .ql-size-huge{
      font-size:3.5rem !important;
    }
    .ql-size-large{
      font-size: 2.2rem !important;
      ${media.mobile`font-size:1.5rem !important`};
    }
    .ql-size-small{
      font-size:1rem !important
    }
    
`;
