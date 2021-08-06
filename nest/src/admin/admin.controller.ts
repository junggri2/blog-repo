import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminService } from "@src/admin/admin.service";
import { IAuthDto } from "@src/admin/dto/auth.dto";
import phoneCertification from "@lib/certification";
import makeAccessToken from "@lib/makeAccessToken";
import { IContactDto } from "@src/admin/dto/contact.dto";

@Controller("admin")
export class AdminController {
   constructor(
      private readonly AdminService: AdminService,
   ) {
   }

   @Post("/check/auth")
   async checkAuth(@Body() authDto: IAuthDto) {
      const state: boolean = await this.AdminService.checkIsAuth(authDto);
      let certificationNum: number = null;
      process.env.NODE_ENV === "development" ? certificationNum = 1 : certificationNum = phoneCertification();
      if (state) {
         return { state: true, certificationNum };
      } else {
         return { state: false };
      }
   }

   @Get("/token")
   async returnToken() {
      return makeAccessToken();
   }

   @Post("/contact")
   async saveGetContact(@Body() contactDto: IContactDto) {
      return await this.AdminService.saveContact(contactDto);
   }
}
