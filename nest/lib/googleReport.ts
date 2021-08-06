const { google } = require("googleapis");
import * as dotenv from "dotenv";

dotenv.config();
let viewID = process.env.VIEW_ID;
export default function googleReport() {
   return new Promise((resolve, reject) => {

      let jwtClient = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, ["https://www.googleapis.com/auth/analytics.readonly"], null);
      jwtClient.authorize(function(err: any, tokens: any) {
         if (err) {
            console.log(err);
            return;
         }
         let analytics = google.analytics("v3");
         queryData(analytics);
      });


      function queryData(analytics: any) {
         analytics.data.ga.get({
            "auth": jwtClient,
            "ids": viewID,
            "start-date": "2021-01-05",
            "end-date": "today",
            "dimensions": "ga:date",
            "metrics": "ga:users,ga:sessions",
         }, function(err: any, response: any) {
            if (err) {
               console.log(err);
               reject(err);
               return;
            }
            resolve(JSON.stringify(response.data, null, 4));
         });
      }
   });


}
