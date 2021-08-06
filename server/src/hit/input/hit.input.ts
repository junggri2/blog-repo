import {Field, InputType, registerEnumType} from "@nestjs/graphql";


export enum DashBoardFrequency {
    ONE_MONTH = "one_month",
    THREE_MONTH = "three_month",
    SIX_MONTH = "six_month"
}

registerEnumType(DashBoardFrequency, {
    name: 'dashBoardFrequency'
})

@InputType()
export class HitInput {
    @Field()
    postHashId: string;
}

@InputType()
export class DashBoardInput {
    @Field(() => DashBoardFrequency)
    frequency: DashBoardFrequency
}