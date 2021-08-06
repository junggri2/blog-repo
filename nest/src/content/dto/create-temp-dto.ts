export class createTempDto {
   data: {
      contentName: string
      content: string
      topicName: string
      kindofPosts: string
      detail: string
      thumbnail: string | null
   };
   uid: string | undefined;
}