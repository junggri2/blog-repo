import { MigrationInterface, QueryRunner } from "typeorm";

export class Content1615622315021 implements MigrationInterface {

   async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE content RENAME COLUMN id TO ids");
   }

   async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE content RENAME COLUMN ids TO id");
   }

}
