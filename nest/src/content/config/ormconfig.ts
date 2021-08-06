import { Content } from "../content.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const config: TypeOrmModuleOptions = {
   name: "content",
   type: "mysql",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT),
   username: process.env.DB_USER,
   password: process.env.DB_PWD,
   database: process.env.DB_DATABASE2,
   entities: [Content],
   synchronize: process.env.NODE_ENV === "development",
   migrationsTableName: "content_migration",
   migrations: ["dist/migrationCT/**/*.js"],
};