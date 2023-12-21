import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserQuotaFields1616576677254 implements MigrationInterface {
  name = 'AddUserQuotaFields1616576677254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "movieQuotaLimit" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "movieQuotaDays" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "tvQuotaLimit" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "tvQuotaDays" integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "movieQuotaLimit"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "movieQuotaDays"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tvQuotaLimit"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tvQuotaDays"`);
  }
}
