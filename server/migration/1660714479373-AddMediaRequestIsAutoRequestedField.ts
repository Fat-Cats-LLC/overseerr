import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMediaRequestIsAutoRequestedField1660714479373
  implements MigrationInterface
{
  name = 'AddMediaRequestIsAutoRequestedField1660714479373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "isAutoRequest" boolean NOT NULL DEFAULT (false)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP COLUMN "isAutoRequest"`
    );
  }
}
