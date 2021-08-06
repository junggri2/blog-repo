import {Module} from "@nestjs/common";
import {FileService} from "@src/file/file.service";

@Module({
    providers: [FileService],
    exports: [FileService]
})

export class FileModule {

}