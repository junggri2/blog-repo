import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import jwt from "jsonwebtoken";

@Injectable()
export class JwtGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      request.login = this.validationToken(request.headers.token.split(" ")[1]);
      return request.login;
   }

   public validationToken(token: string): any {
      try {
         jwt.verify(token, process.env.JWT_SECRET);
         return { status: true };
      } catch (e) {
         return { status: false };
      }
   };

}

