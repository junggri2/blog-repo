import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default function jwtAccessToken() {
   return jwt.sign(
      { login: true },
      process.env.JWT_SECRET,
      {
         expiresIn: "300m",
         issuer: "junggri",
         subject: "status",
      },
   );
}
