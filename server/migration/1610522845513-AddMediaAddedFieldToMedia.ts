import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMediaAddedFieldToMedia1610522845513
  implements MigrationInterface
{
  name = 'AddMediaAddedFieldToMedia1610522845513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "mediaAddedAt" timestamp`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "mediaAddedAt"`);
  }
}
