import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {ContentModule} from "./content/content.module";
import {CommentModule} from "./comment/comment.module";
import {ApiModule} from "./api/api.module";
import {MorganInterceptor, MorganModule} from "nest-morgan";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {AdminModule} from "./admin/admin.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env.development",
            isGlobal: true,
        }),
        // TypeOrmModule.forRoot(config),
        // TypeOrmModule.forRoot(config_comment),
        // TypeOrmModule.forFeature([Content], "content"),
        // TypeOrmModule.forFeature([Comment], "comment"),
        ContentModule,
        CommentModule,
        ApiModule,
        MorganModule,
        AdminModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: MorganInterceptor(process.env.NODE_ENV == "development" ? "dev" : "combined"),
        },
    ],
})

export class AppModule {
}
