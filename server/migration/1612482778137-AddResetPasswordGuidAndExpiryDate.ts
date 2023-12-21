import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPasswordGuidAndExpiryDate1612482778137
  implements MigrationInterface
{
  name = 'AddResetPasswordGuidAndExpiryDate1612482778137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "resetPasswordGuid" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "recoveryLinkExpirationDate" date`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "resetPasswordGuid"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "recoveryLinkExpirationDate"`
    );
  }
}
