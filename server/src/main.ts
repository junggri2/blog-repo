import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import setCorsOption from "@utils/setCorsOption";
import {Session} from "@config/session";
import session from "express-session";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import {ValidationPipe} from "@nestjs/common";

console.log(123)
console.log(12344)
console.log(12345)

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors(setCorsOption<string>(
        [
            "https://admin.junggri.com",
            "http://localhost:3002",
            "http://localhost:3000"
        ]
    ));

    app.use(session(Session.create()))
        .use(compression())
        .use(cookieParser())
        .use(bodyParser.json({limit: "10mb"}))
        .use(bodyParser.urlencoded({extended: true, limit: "10mb"}))
        .useStaticAssets(path.resolve("../thumbnail"), {prefix: "/thumbnail"});


    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT);

    console.log(`listen ${process.env.PORT} port`);
}

bootstrap();
