import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLanguageProfileId1612571545781 implements MigrationInterface {
  name = 'AddLanguageProfileId1612571545781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "languageProfileId" integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP COLUMN "languageProfileId"`
    );
  }
}
