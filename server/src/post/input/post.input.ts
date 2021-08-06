import {Field, ID, InputType, Int} from "@nestjs/graphql";

@InputType()
export class PostInput {
    @Field(() => ID, {nullable: true})
    hashId?: string;

    @Field()
    title: string;

    @Field()
    desc: string;

    @Field()
    content: string;

    @Field({nullable: true, defaultValue: null})
    thumbnail?: string;

    @Field({defaultValue: true})
    open: boolean;

    @Field()
    isPublished: boolean;

    @Field(() => [Int])
    tagIds: number[];
}

