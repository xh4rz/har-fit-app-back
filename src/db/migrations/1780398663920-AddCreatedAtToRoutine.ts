import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToRoutine1780398663920 implements MigrationInterface {
    name = 'AddCreatedAtToRoutine1780398663920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routines" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routines" DROP COLUMN "createdAt"`);
    }

}
