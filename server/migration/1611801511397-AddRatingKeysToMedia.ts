import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRatingKeysToMedia1611801511397 implements MigrationInterface {
  name = 'AddRatingKeysToMedia1611801511397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "ratingKey" varchar`
    );

    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "ratingKey4k" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "ratingKey"`);

    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "ratingKey4k"`);
  }
}
