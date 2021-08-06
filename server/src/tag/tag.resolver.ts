import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {TagService} from "@src/tag/tag.service";
import {TagInput} from "@src/tag/input/tag.input";
import {Tag} from "@src/entities";

@Resolver()
export class TagResolver {
  constructor(
    private readonly tagService: TagService
  ) {
  }

  @Mutation(() => Tag)
  async upsertTag(@Args('data') data: TagInput) {
    return await this.tagService.upsertTag(data);
  }
}
