export const Delete_Post_Query = `
   mutation gql($id : Float!){
      deletePost(id : $id)
   }
`;

export const ChangeTo_Private_Post = `
   mutation gql($id : Float!){
      toPrivate(id : $id)
   }
`;

export const create_Post = `
    mutation gql($data : PostInput!, $file :Upload!){
        createPost(data : $data, file : $file)
    }
`;

export const create_Hit = `
    mutation gql($data : HitInput!){
        createHit(data : $data){
            id
            hashId
            createdAt
            updatedAt
        }
    }
`;

export const TEST_IMAGE = `
    mutation gql($file :Upload!){
        createImage(file : $file)
    }
`;

export const TEXT_UPLOAD = `
    mutation gql($data : String!, $filename : String!){
        upLoadContentToS3(data: $data , filename : $filename)
    }
`;

export const UPSERT_POST = `
    mutation gql($data : PostInput!, $file :Upload){
        upsertPost(data : $data, file : $file)
    }
`;

export const CREATE_REPLY = `
    mutation gql($data : ReplyCreateInput!){
        createReply(data : $data){
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

export const CREATE_TAG = `
    mutation gql($data : TagInput!){
        upsertTag(data : $data){
            hashId
            createdAt
            updatedAt
            tag
        }
    }
`;

export const DELETE_REPLY = `
    mutation gql($data : ReplyInput!){
        deleteReply(data : $data)
        
    }
`;