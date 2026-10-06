import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkouts1791271565894 implements MigrationInterface {
    name = 'CreateWorkouts1791271565894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routines_exercises" DROP CONSTRAINT "FK_984c9b4827fe0f0678661345d85"`);
        await queryRunner.query(`CREATE TABLE "workout_exercise_sets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "set" integer NOT NULL, "reps" integer NOT NULL, "kg" double precision NOT NULL, "completed" boolean NOT NULL DEFAULT false, "workoutExerciseId" uuid NOT NULL, CONSTRAINT "PK_ecd37ba99fb48d99a2930a7260d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workouts_exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "restTimer" integer NOT NULL DEFAULT '0', "workoutId" uuid NOT NULL, "exerciseId" uuid NOT NULL, CONSTRAINT "PK_067ed7f7e952227edfdf62ed8e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workouts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "duration" integer NOT NULL, "description" text, "volume" double precision NOT NULL, "sets" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" ADD CONSTRAINT "FK_984c9b4827fe0f0678661345d85" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_sets" ADD CONSTRAINT "FK_48f58f855bcc01d16281518d8d7" FOREIGN KEY ("workoutExerciseId") REFERENCES "workouts_exercises"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts_exercises" ADD CONSTRAINT "FK_54795bf2c0d7149a3ca9b235dfa" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts_exercises" ADD CONSTRAINT "FK_187343482efbcf83a663903e1d9" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"`);
        await queryRunner.query(`ALTER TABLE "workouts_exercises" DROP CONSTRAINT "FK_187343482efbcf83a663903e1d9"`);
        await queryRunner.query(`ALTER TABLE "workouts_exercises" DROP CONSTRAINT "FK_54795bf2c0d7149a3ca9b235dfa"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_sets" DROP CONSTRAINT "FK_48f58f855bcc01d16281518d8d7"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" DROP CONSTRAINT "FK_984c9b4827fe0f0678661345d85"`);
        await queryRunner.query(`DROP TABLE "workouts"`);
        await queryRunner.query(`DROP TABLE "workouts_exercises"`);
        await queryRunner.query(`DROP TABLE "workout_exercise_sets"`);
        await queryRunner.query(`ALTER TABLE "routines_exercises" ADD CONSTRAINT "FK_984c9b4827fe0f0678661345d85" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
