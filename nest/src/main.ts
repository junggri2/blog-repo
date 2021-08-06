import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import sessionConfig from "../config/session.config";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {csrfProtection} from "@lib/middlewares";
import path from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const options = {
        origin: ["https://admin.junggri.com", "http://localhost:3002", "http://localhost:3000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 204,
        credentials: true,
    };


    app.use(session(sessionConfig))
        // .use(header)
        .use(helmet.noSniff())
        .use(helmet.xssFilter())
        .use(helmet.frameguard({action: "deny"}))
        .use(compression())
        .use(cookieParser(process.env.SESSEION_KEY))
        .use(bodyParser.json({limit: "50mb"}))
        .use(bodyParser.urlencoded({extended: true, limit: "50mb"}))
        .use(csrfProtection)
        .useStaticAssets(path.resolve("../thumbnail"), {prefix: "/thumbnail"});

    app.enableCors(options);

    console.log("listening on 5000  port");

    await app.listen(5000);

    if (module.hot && process.env.NODE_ENV === "development") {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
