import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "@src/admin/admin.controller";
import { AdminConnection } from "@lib/connection.builder";

@Module({
   controllers: [AdminController],
   providers: [
      AdminService,
      AdminConnection,
   ],
   exports: [AdminService],
})
export class AdminModule {
}
