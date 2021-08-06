import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Tag} from "@src/entities";
import {Repository} from "typeorm";
import {TagInput} from "@src/tag/input/tag.input";
import {HashidsService} from "@src/hashids/hashids.service";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    private readonly hashIdService: HashidsService
  ) {
  }

  async upsertTag(data: TagInput) {
    const isExistHashId = !!data.hashId;
    const tagId = this.hashIdService.decode(data.hashId);

    if (isExistHashId && !tagId) {
      throw new Error("유효하지 않은 접근입니다.");
    }

    if (tagId) {

      const updateResult = await this.tagRepository
        .createQueryBuilder()
        .update()
        .set({
          tag: data.tagName
        })
        .where('tag.id = :id', {id: tagId})
        .execute();

      if (!updateResult.affected) {
        throw new Error("존재하지 않는 테그입니다.");
      }

      return await this.tagRepository
        .createQueryBuilder()
        .select()
        .where('tag.id = :id', {id: tagId})
        .getOne();
    }

    const tags = await this.tagRepository
      .createQueryBuilder("tag")
      .select("tag")
      .getMany();

    const existTag = tags.map((e) => e.tag).includes(data.tagName);

    if (existTag) {
      return "exist already";
    }

    const insertResult = await this.tagRepository
      .createQueryBuilder()
      .insert()
      .values({
        tag: data.tagName
      })
      .execute();


    const tag = await this.tagRepository
      .createQueryBuilder()
      .select()
      .where("tag.id = :id", {id: insertResult.identifiers[0].id})
      .getOne();

    return tag;
  }

}