import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PostService} from '@src/post/post.service';
import {Post} from "@src/entities/Post";
import {PostInput} from "@src/post/input/post.input";
import {GraphQLUpload} from "apollo-server-express";
import {FileService} from "@src/file/file.service";
import {FileUpload} from "@src/file/input/file.input";


@Resolver(of => Post)
export class PostResolver {
    constructor(
        private readonly postService: PostService,
        private readonly fileService: FileService
    ) {
    }

    @Query(returns => [Post], {name: "posts"})
    async getAllPost() {
        return await this.postService.findAllPost();
    }

    @Query(() => Post, {name: 'post', nullable: true})
    async getPost(@Args("hashId") hashId: string) {
        return await this.postService.findById(hashId);
    }


    @Mutation(() => String)
    async deletePost(@Args("id") id: number) {
        return await this.postService.deletePost(id);
    }

    @Mutation(() => String)
    async toPrivate(@Args("id") id: number) {
        return this.postService.toPrivate(id);
    }

    @Mutation(() => Post)
    async upsertPost(
        @Args("data") data: PostInput,
        @Args("file", {type: () => GraphQLUpload, nullable: true}) file: FileUpload
    ) {
        return await this.postService.upsertPost(data, file);
    }


    // @Mutation(() => String)
    // async createImage(@Args("file", {type: () => GraphQLUpload}) file: FileUpload) {
    //    await this.fileService.upsertImage(file);
    //    return "vnaksd";
    // }
    //
    // @Mutation(() => String)
    // async upLoadContentToS3(@Args('data') data: string, @Args('filename') filename: string) {
    //    await this.fileService.upsertContent(data, filename);
    //    return "asda";
    // }
    //
    // @Query(() => String)
    // async getS3data(@Args('data') data: string) {
    //    // return JSON.stringify(await this.fileService.getS3Data(data));
    // }

}
