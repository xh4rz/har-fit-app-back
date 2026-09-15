import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoutineExerciseSets1789432544497 implements MigrationInterface {
    name = 'CreateRoutineExerciseSets1789432544497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "routine_exercise_sets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "set" integer NOT NULL, "reps" integer NOT NULL, "kg" double precision NOT NULL, "routineExerciseId" uuid NOT NULL, CONSTRAINT "PK_3ec1a7e30903dc8d7d7d6be05c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" DROP COLUMN "set"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" DROP COLUMN "reps"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" DROP COLUMN "kg"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" ADD "restTimer" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routine_exercise_sets" ADD CONSTRAINT "FK_8f3f48d448626eda64c465e7bd2" FOREIGN KEY ("routineExerciseId") REFERENCES "routines_exercises"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routine_exercise_sets" DROP CONSTRAINT "FK_8f3f48d448626eda64c465e7bd2"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" DROP COLUMN "restTimer"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" ADD "kg" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" ADD "reps" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" ADD "set" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "routine_exercise_sets"`);
    }

}
