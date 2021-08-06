import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {HitService} from "@src/hit/hit.service";
import {Response} from "express";
import {DashBoardInput, HitInput} from "@src/hit/input/hit.input";
import {ctx} from "@decorator/gqlContext.decorator";
import {Hit} from "@src/entities";

@Resolver()
export class HitResolver {
    constructor(
        private readonly hitService: HitService
    ) {
    }

    @Mutation(() => Hit, {nullable: true})
    async createHit(@ctx() res: Response, @Args('data') data: HitInput) {
        return await this.hitService.createHit(res, data);
    }


    @Query(() => [Hit], {nullable: true})
    async getDashBoard(
        @Args("postId") postId: number,
        @Args("data") data: DashBoardInput
    ) {
        return await this.hitService.getDashBoard(postId, data);

    }
}