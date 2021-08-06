import request from "request";
import crypto from "crypto-js";
import * as dotenv from "dotenv";

let resultCode: number;

dotenv.config();
export default function certifiCation(postname: string, who: string, content: string) {

   const date = Date.now().toString();
   const uri = process.env.API_URI;
   const secretKey = process.env.API_SECRETKEY as string;
   const accessKey = process.env.API_ACCESSKEY as string;
   const method = "POST";
   const space = " ";
   const newLine = "\n";
   const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
   const url2 = `/sms/v2/services/${uri}/messages`;
   const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey);

   hmac.update(method);
   hmac.update(space);
   hmac.update(url2);
   hmac.update(newLine);
   hmac.update(date);
   hmac.update(newLine);
   hmac.update(accessKey);

   const hash = hmac.finalize();
   const signature = hash.toString(crypto.enc.Base64);


   request(
      {
         method: method,
         json: true,
         uri: url,
         headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
         },
         body: {
            type: "SMS",
            countryCode: "82",
            from: process.env.API_PHONE,
            content: `${postname}글에 ${who}님이 댓글을 작성하셨습니다. 
                      댓글내용 : ${content}
                      `,
            messages: [
               {
                  to: process.env.API_PHONE,
               },
            ],
         },
      },
      (err: any, res: any, html: any) => {
         if (err) console.log(err);
         else {
            resultCode = 200;
            console.log(1, html);
         }
      },
   );
   return true;
}
