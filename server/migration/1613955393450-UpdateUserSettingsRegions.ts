import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserSettingsRegions1613955393450
  implements MigrationInterface
{
  name = 'UpdateUserSettingsRegions1613955393450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "region" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "originalLanguage" varchar`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME CONSTRAINT "REL_986a2b6d3c05eb4091bb8066f7" TO "UQ_986a2b6d3c05eb4091bb8066f78"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_settings" DROP COLUMN "region"`);
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "originalLanguage"`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME CONSTRAINT "UQ_986a2b6d3c05eb4091bb8066f78" TO "REL_986a2b6d3c05eb4091bb8066f7"`
    );
  }
}
