import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagsFieldonMediaRequest1617624225464
  implements MigrationInterface
{
  name = 'CreateTagsFieldonMediaRequest1617624225464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "tags" text`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media_request" DROP COLUMN "tags"`);
  }
}
