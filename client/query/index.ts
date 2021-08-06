import {gql} from "@apollo/client";

//프래그먼트의 타입은 서버에서 나온 타입이다.

export const reply_fragment = gql`
   fragment replyBody on Reply{
      id
      createdAt
      updatedAt
      board
      parent
      bgroup
      sorts
      depth
      cmt
      writer
      
   }
`;

export const hit_fragment = gql`
   fragment hitBody on Hit{
      id
      createdAt
      updatedAt
   }
`;

export const post_fragment = gql`
   ${reply_fragment}
   ${hit_fragment}
   fragment postBody on Post {
      id 
      uid
      title
      desc
      content
      thumbnail
      createdAt
      updatedAt
      open
      hit {
         ...hitBody
      }
      reply{
         ...replyBody
      }
   }
`;


export const GetPostsQuery = gql`
   ${post_fragment}
   query gql {
      posts{
         ...postBody
      } 
   }   
`;


export const GetPostQuery = gql`
   ${post_fragment}
   query gql($uid : String!){
      post(uid : $uid){
         ...postBody
      }
   }
`;
