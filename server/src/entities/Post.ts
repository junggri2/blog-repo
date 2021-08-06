import {Field, ObjectType} from '@nestjs/graphql';
import {Column, Entity, ManyToMany, OneToMany, RelationId} from "typeorm";
import {Hit} from "@src/entities/Hit";
import {Base} from './BaseEntity';
import {TypeormLoaderExtension} from "@webundsoehne/nestjs-graphql-typeorm-dataloader";
import {Reply} from "@src/entities/Reply";
import {Tag} from "@src/entities/Tag";

@ObjectType()
@Entity()

export class Post extends Base {
    @Field()
    @Column("varchar")
    title: string;

    @Field()
    @Column("varchar")
    desc: string;

    @Field()
    @Column("varchar")
    content: string;

    @Field({nullable: true})
    @Column({nullable: true, default: null})
    thumbnail?: string;

    @Field()
    @Column({default: true, type: "boolean"})
    open: boolean;

    @Field()
    @Column({default: 0})
    like: number;

    @Column({default: true})
    isPublished: boolean;

    @Field(() => [Hit], {nullable: true})
    @OneToMany(() => Hit, hit => hit.post, {cascade: true})
    @TypeormLoaderExtension((post: Post) => post.hitId)
    hit?: Hit[];

    @RelationId((post: Post) => post.hit)
    hitId: number;

    @Field(() => [Reply], {nullable: true})
    @OneToMany(() => Reply, reply => reply.post, {cascade: true})
    @TypeormLoaderExtension((post: Post) => post.replyId)
    reply?: Reply[];

    @RelationId((post: Post) => post.reply)
    replyId: number;

    @RelationId((post: Post) => post.tag)
    tagId: number;

    @Field(() => [Tag])
    @ManyToMany(() => Tag, tag => tag.post, {cascade: true})
    @TypeormLoaderExtension((post: Post) => post.tagId)
    tag: Tag[];

}
