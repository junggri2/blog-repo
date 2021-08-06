import csrf from "csurf";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const csrfProtection = csrf({
   cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
   },
});


export const header = (req: Request, res: Response, next: NextFunction) => {
   res.header("Cache-control", "no-cache, must-revalidate");
   res.header("Pragma", "no-cache");
   res.header("Access-Control-Allow-Methods", "GET HEAD PUT PATCH POST DELETE");
   res.header("Access-Control-Allow-Origin", "https://admin.junggri.com/");
   next();
};