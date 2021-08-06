import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import googleReport from "@lib/googleReport";
import { ApiService } from "@src/api/api.service";
import { JwtGuard } from "../../guard/jwt.guard";
import { User } from "../../Decorator/user.decorator";

interface IRequset extends Request {
   csrfToken?: any
}

interface User {
   status: boolean
}

@Controller("api")
export class ApiController {
   constructor(private readonly apiService: ApiService) {
   }

   @Get("/check/status")
   @UseGuards(JwtGuard)
   checkStatas(@User() user: User) {
      return user.status;
   }

   @Get("/csrf")
   getCsrf(@Req() request: IRequset): string {
      return request.csrfToken();
   }

   @Get("/google/count")
   async getCount() {
      return await googleReport();
   }

   // @Post("/check/auth")
   // async checkAuth(@Body() authDto: IAuthDto) {
   //    const state: boolean = await this.apiService.checkIsAuth(authDto);
   //    let certificationNum: number = null;
   //    process.env.NODE_ENV === "development" ? certificationNum = 1 : certificationNum = phoneCertification();
   //    if (state) {
   //       return { state: true, certificationNum };
   //    } else {
   //       return { state: false };
   //    }
   // }
   //
   // @Post("/token")
   // async setToken() {
   //    return makeAccessToken();
   // }

}
