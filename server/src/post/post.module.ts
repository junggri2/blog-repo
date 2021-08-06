import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostResolver} from './post.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "@src/entities";
import {FileModule} from "@src/file/file.module";
import {HashidsModule} from "@src/hashids/hashids.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        FileModule,
        HashidsModule,
    ],
    providers: [
        PostResolver,
        PostService,
    ],
    exports: [
        PostService
    ]
})
export class PostModule {
}
