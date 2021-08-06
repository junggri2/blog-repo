import {Injectable} from '@nestjs/common';
import {Hit, Post, Reply, Tag} from "@src/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, EntitySubscriberInterface, EventSubscriber, Repository} from "typeorm";
import {PostInput} from "@src/post/input/post.input";
import {NotExistPost} from "@exception/NotExistPost";
import {HashidsService} from "@src/hashids/hashids.service";
import {FileService} from "@src/file/file.service";
import {FileUpload} from "@src/file/input/file.input";
import path from "path";
import * as faker from "faker";

@Injectable()
@EventSubscriber()
export class PostService implements EntitySubscriberInterface<Post> {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private readonly hashIdsService: HashidsService,
        private readonly fileService: FileService
    ) {
    }

    listenTo(): Function | string {
        return Post;
    }

    async findAllPost() {
        const data = await this.postRepository
            .createQueryBuilder()
            .getMany();
        return data;
    }

    async findById(hashId: string) {
        const postId = this.hashIdsService.decode(hashId);

        if (postId) {
            throw new Error("존재하지 않는 포스트입니다.");
        }

        const data = await this.postRepository
            .createQueryBuilder("post")
            .select()
            .where("post.id =:id", {id: postId})
            .getOne();

        return data;
    }

    async deletePost(postId: number) {
        const target = await this.postRepository.createQueryBuilder()
            .select()
            .where("id = :id", {id: postId})
            .getOne();

        if (!target) {
            throw new NotExistPost();
        }

        const data: DeleteResult = await this.postRepository
            .createQueryBuilder("post")
            .delete()
            .from(Post)
            .where("id = :id", {id: postId})
            .execute();

        return data.affected;
    }

    async toPrivate(postId: number) {
        const target = await this.postRepository
            .createQueryBuilder()
            .select()
            .where("id = :id", {id: postId})
            .getOne();

        if (!target) {
            throw new NotExistPost();
        }

        if (!target.open) {
            throw new Error("이미 비공개된 포스트입니다.");
        }


        const data = await this.postRepository
            .createQueryBuilder()
            .update(Post)
            .set({open: false})
            .where("id = :id", {id: postId})
            .execute();

        return data.affected;
    }


    async upsertPost(post: PostInput, file: FileUpload) {
        let insertResult;
        const isExistHashId = !!post.hashId;
        const isExistThumbnail = !!post.thumbnail;

        let s3Filename = post.hashId;
        let s3ImageName = post.thumbnail; //null or string

        const postId = this.hashIdsService.decode(post.hashId);

        if (isExistHashId && !postId || isExistThumbnail && !postId) {
            throw new Error("유효하지 않은 접근입니다.");
        }


        if (file) {
            s3ImageName = s3ImageName || new Date().valueOf() + path.extname(file.filename);
            await this.fileService.upsertImage({...file, filename: s3ImageName});
        }


        if (this.hashIdsService.decode(post.hashId)) {
            insertResult = await this.postRepository
                .createQueryBuilder()
                .update(Post)
                .where("post.id = :id", {id: postId})
                .set({
                    title: post.title,
                    desc: post.desc,
                    open: post.open,
                    isPublished: post.isPublished,
                    thumbnail: s3ImageName
                })
                .execute();

        } else {
            insertResult = await this.postRepository
                .createQueryBuilder()
                .insert()
                .into(Post)
                .values({
                    ...post,
                    thumbnail: s3ImageName
                })
                .execute();

            await this.savePostTag(insertResult.identifiers[0].id, post.tagIds);
            s3Filename = this.hashIdsService.encode(insertResult.identifiers[0].id);
        }
        await this.fileService.upsertContent(post.content, s3Filename);

        const upsertPost = await this.postRepository
            .createQueryBuilder()
            .select()
            .where("post.id = :id", {id: insertResult.identifiers[0].id})
            .getOne();

        return upsertPost;
    }

    async savePostTag(postId: number, tags: number[]) {
        for await(let id of tags) {
            await this.postRepository
                .createQueryBuilder()
                .insert()
                .into("post_tag")
                .values({
                    "post_id": postId,
                    "tag_id": id
                })
                .execute();
        }
    }

    async onApplicationBootstrap(): Promise<void> {

        for (let i = 0; i < 3; i++) {
            await this.postRepository.createQueryBuilder()
                .insert()
                .into(Post)
                .values({
                    createdAt: faker.datatype.datetime(),
                    updatedAt: faker.datatype.datetime(),
                    title: faker.lorem.sentence(),
                    desc: faker.lorem.sentence(),
                    content: faker.lorem.sentence(),
                    thumbnail: faker.lorem.sentence(),
                    open: true,
                    like: 0
                })
                .execute();
            for (let j = 0; j < 2; j++) {
                await this.postRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Hit)
                    .values({
                        createdAt: faker.datatype.datetime(),
                        updatedAt: faker.datatype.datetime(),
                        postId: i + 1,
                        identifier: faker.datatype.uuid()
                    })
                    .execute();
            }
        }

        for (let i = 0; i < 2; i++) {
            await this.postRepository
                .createQueryBuilder()
                .insert()
                .into(Tag)
                .values({
                    tag: 'test' + i,
                })
                .execute();

        }


        await this.postRepository
            .createQueryBuilder()
            .insert()
            .into("post_tag")
            .values({
                "post_id": 1,
                "tag_id": 1,
            })
            .execute();

        await this.postRepository
            .createQueryBuilder()
            .insert()
            .into("post_tag")
            .values({
                "post_id": 1,
                "tag_id": 2,
            })
            .execute();

        for (let i = 0; i < 2; i++) {
            await this.postRepository
                .createQueryBuilder()
                .insert()
                .into(Reply)
                .values({
                    bgroup: 1,
                    sorts: i,
                    depth: i,
                    comment: "test",
                    writer: "lee",
                    postId: 1,
                    parentId: i === 0 ? null : i
                })
                .execute();
        }


    }

}
