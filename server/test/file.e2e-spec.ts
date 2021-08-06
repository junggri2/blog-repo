import fs from "fs/promises";
import request from "supertest";
import {TEST_IMAGE, TEXT_UPLOAD} from "./mutations/mutation";
import {GET_S3} from "./queries/query";

describe("파일 업로드 테스트", () => {
    it("이미지를 저장합니다", async () => {
        const img = await fs.readFile("test/img/testimg.png");
        const map = {};
        map['0'] = [`variables.file`];


        const query = request(global.app.getHttpServer())
            .post("/graphql")
            .field('operations',
                JSON.stringify({
                    query: TEST_IMAGE,
                    variables: {file: null}
                }))
            .field('map', JSON.stringify(map))
            .field("0", img);

        const {body} = await query;
        console.log(body);
    });

    it("s3에 포스트를 저장합니다", async () => {
        const text = "test";
        const query = await request(global.app.getHttpServer())
            .post("/graphql")
            .send({query: TEXT_UPLOAD, variables: {data: text, filename: "test"}});
    });

    it.only("s3의 오브젝트를 가져옵니다", async () => {
        const {body} = await request(global.app.getHttpServer())
            .post('/graphql')
            .send({query: GET_S3, variables: {data: "testimg.png"}});

        // console.log(JSON.parse(body.data.getS3data));
        // expect(JSON.parse(body.data.getS3data)).toHaveProperty('AcceptRanges');
    });


});