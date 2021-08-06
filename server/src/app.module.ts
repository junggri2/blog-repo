import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import path, {join} from "path";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HitModule} from "@src/hit/hit.module";
import {PostModule} from "@src/post/post.module";
import {HashidsModule} from "@src/hashids/hashids.module";
import {FileModule} from "@src/file/file.module";
import {TagModule} from "@src/tag/tag.module"
import {APP_INTERCEPTOR} from "@nestjs/core";
import {DataLoaderInterceptor, TypeormLoaderMiddleware} from "@webundsoehne/nestjs-graphql-typeorm-dataloader";
import {getConnection} from "typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {ReplyModule} from "@src/reply/reply.module";


@Module({
   providers: [
      {
         provide: APP_INTERCEPTOR,
         useFactory: (): DataLoaderInterceptor => new DataLoaderInterceptor({
            typeormGetConnection: getConnection
         })
      }
   ],
   imports: [
      ConfigModule.forRoot({
         envFilePath: process.env.NODE_ENV === "development" ? ".env.development" : process.env.NODE_ENV === "test" ? ".env.test" : ".env.production",
         isGlobal: true
      }),
      GraphQLModule.forRoot({
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         sortSchema: true,
         cors: {
            origin: process.env.GRAPHQL_ORIGIN,
            credentials: true,
         },
         buildSchemaOptions: {
            fieldMiddleware: [TypeormLoaderMiddleware]
         },
         context: ({req, res}) => ({req, res}),
         // uploads: false
      }),
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (config: ConfigService) => {
            return {
               type: "mysql",
               host: config.get("TYPEORM_HOST"),
               port: config.get<number>("TYPEORM_PORT"),
               username: config.get("TYPEORM_USERNAME"),
               password: config.get("TYPEORM_PASSWORD"),
               database: config.get("TYPEORM_DATABASE"),
               migrationRun: config.get("TYPEORM_RUN_MIGRATION") === "true",
               dropSchema: config.get("TYPEORM_DROP_SCHEMA") === "true",
               synchronize: config.get("TYPEORM_SYNCHRONIZE") === "true",
               logging: config.get("TYPEORM_LOGGING") === "true",
               namingStrategy: new SnakeNamingStrategy(),
               entities: [path.join(__dirname, config.get("TYPEORM_ENTITY"))],
               migrations: [path.join(__dirname, config.get("TYPEORM_MIGRATION"))],
               cli: {
                  entitiesDir: "entities",
                  migrationsDir: "migrations"
               }
            };
         }
      }),
      PostModule,
      HitModule,
      HashidsModule,
      FileModule,
      ReplyModule,
      TagModule
   ],
})


export class AppModule {
}




