//프래그먼트의 타입은 서버에서 나온 타입이다.
export const tag_fragment = `
    fragment tagBody on Tag{
        hashId
        createdAt
        updatedAt
        deletedAt
        tag
    }
`;
export const reply_fragment = `
   fragment replyBody on Reply{
      createdAt
      bgroup
      sorts
      depth
      comment
      writer
      parentId
      hashId
      children{
         id
         createdAt
         bgroup
         sorts
         depth
         comment
         writer
         parentId
         hashId
      }
   }
`;

export const hit_fragment = `
   fragment hitBody on Hit{
      createdAt
      updatedAt
      hashId
   }
`;


export const post_fragment = `
   ${hit_fragment}
   ${reply_fragment}
   ${tag_fragment}
   fragment postBody on Post {
      hashId     
      title
      desc
      content
      thumbnail
      createdAt
      updatedAt
      open
      like
      hit {
         ...hitBody
      }
      reply{
         ...replyBody
      }
      tag{
        ...tagBody
      }
   }
`;


export const Get_Posts_Query = `
   ${post_fragment}
   query gql {
      posts{
         ...postBody
      } 
   }   
`;


export const Get_Post_Query = `
   ${post_fragment}
   query gql($id : Float!){
      post(id : $id){
         ...postBody    
      }
   }
`;


export const GET_S3 = `
    query gql($data:String!){
        getS3data(data:$data)
    }
`;

export const DASH_BOARD = `
   query gql($postId: Float!, $data : DashBoardInput!){
      getDashBoard(postId : $postId, data : $data){
         id
         hashId
         createdAt
         updatedAt
      }
   }
`;

export const GET_REPLY = `
    ${reply_fragment}
    query gql($data : ReplyInput!){
       getReply(data : $data){
          ...replyBody
       }
    }
`;