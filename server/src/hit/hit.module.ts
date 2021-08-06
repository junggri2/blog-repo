import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HitResolver} from "./hit.resolver"
import {Hit} from "@src/entities";
import {HitService} from "@src/hit/hit.service";
import {PostModule} from "@src/post/post.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Hit]),
        PostModule
    ],
    providers: [
        HitResolver,
        HitService
    ],
    exports: [
        HitService
    ]
})
export class HitModule {
}
