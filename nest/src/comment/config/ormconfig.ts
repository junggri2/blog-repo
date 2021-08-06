// import { Comment } from "../comment.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const config_comment: TypeOrmModuleOptions = {
   name: "comment",
   type: "mysql",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT),
   username: process.env.DB_USER,
   password: process.env.DB_PWD,
   database: process.env.DB_DATABASE4,
   // entities: [Comment],
   synchronize: process.env.NODE_ENV === "development",
   migrationsTableName: "comment_migration",
   migrations: ["dist/migrationCM/*.js"],
};