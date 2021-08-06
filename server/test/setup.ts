import {INestApplication, ValidationPipe} from "@nestjs/common";
import {AppModule} from "@src/app.module";
import {Test} from "@nestjs/testing";
import session from "express-session";
import {Session} from "@config/session";
import cookieParser from "cookie-parser";
import setCorsOption from "@utils/setCorsOption";

let app: INestApplication;

declare global {
    namespace NodeJS {
        interface Global {
            app: INestApplication
        }
    }
}

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication(undefined, {logger: true});

    app.enableCors(setCorsOption<string>(
        [
            "*"
        ]
    ));


    app.use(session(Session.create()));
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    global.app = app;

});

afterAll(async () => {
    await app.close();
});