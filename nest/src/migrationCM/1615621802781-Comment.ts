import { MigrationInterface, QueryRunner } from "typeorm";

export class Comment1615621802781 implements MigrationInterface {

   async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE comment RENAME COLUMN board TO d");
   }

   async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE comment RENAME COLUMN d TO board");
   }

}
