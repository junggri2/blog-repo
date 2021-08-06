import request from "supertest";
import {create_Hit} from "./mutations/mutation";
import {DASH_BOARD} from "./queries/query";

describe("Hit e2e test", () => {
    it.skip("hit을 생성합니다", async () => {
        const {body} = await request(global.app.getHttpServer())
            .post("/graphql")
            .set("cookie", "viewed_post=90lVXoJ")
            .send({query: create_Hit, variables: {data: {postHashId: 'yxoaBEP'}}});
        // .expect((res) => console.log(res.headers))

        expect(body.data.createHit).toHaveProperty("hashId");
    });

    it.skip("대시보드를 가져옵니다", async () => {
        const {body} = await request(global.app.getHttpServer())
            .post("/graphql")
            .send({query: DASH_BOARD, variables: {postId: 4, data: {frequency: "THREE_MONTH"}}});

        expect(body.data.getDashBoard[0]).not.toBeUndefined();
    });

});

// const log = ['90lVXoJ', 'rqEx2k3', 'gKo2YkW', 'yxoaBEP', 'PylJ3kL']