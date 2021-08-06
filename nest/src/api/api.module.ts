import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
   imports: [JwtModule.register({})],
   controllers: [ApiController],
   providers: [
      ApiService,
   ],
   exports: [ApiService],
})
export class ApiModule {
}
