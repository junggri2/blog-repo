import {Field, ObjectType} from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId} from "typeorm";
import {Base} from "@src/entities/BaseEntity";
import {Post} from "@src/entities/Post";
import {TypeormLoaderExtension} from "@webundsoehne/nestjs-graphql-typeorm-dataloader";

@ObjectType()
@Entity()

export class Reply extends Base {
    @Field()
    @Column({type: "int"})
    bgroup: number;

    @Field()
    @Column({type: "int"})
    sorts: number;

    @Field()
    @Column({type: "int"})
    depth: number;

    @Field()
    @Column("varchar", {length: 500})
    comment: string;

    @Field()
    @Column("varchar", {length: 40})
    writer: string;


    @ManyToOne(() => Post, post => post.reply)
    @JoinColumn({name: "post_id"})
    post: Post;


    @Column({type: 'int', nullable: false})
    postId: number;

    @ManyToOne(() => Reply, reply => reply.children, {
        onDelete: "CASCADE"
    })
    @Field(() => Reply, {nullable: true})
    @JoinColumn({name: "parent_id"})
    parent: Reply;

    @Column({type: "int", nullable: true})
    @Field({nullable: true})
    parentId: number;

    @RelationId((reply: Reply) => reply.children)
    childrenIds: number[];

    @OneToMany(() => Reply, reply => reply.parent, {cascade: true})
    @Field(() => [Reply])
    @TypeormLoaderExtension((reply: Reply) => reply.childrenIds)
    children: Reply[];
}
