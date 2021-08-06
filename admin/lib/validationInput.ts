interface IValidationData {
   content: string
   contentName: string
   detail: string
   kindofPosts: string
   topicName: string
}

export default function validaitionInput(data: IValidationData) {
   if (data.content === "" || data.contentName === "" || data.detail === "" || data.kindofPosts === "" || data.topicName === "") {
      return false;
   } else {
      return true;
   }
}