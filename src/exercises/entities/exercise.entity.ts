import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ExerciseVideo } from './exercise-video.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { RoutineExercise } from '../../routines/entities/routine-exercise.entity';

@Entity({ name: 'exercises' })
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('text', { array: true })
  instruction: string[];

  @OneToOne(() => ExerciseVideo, (video) => video.exercise, {
    cascade: true,
    eager: true,
  })
  video: ExerciseVideo;

  @Column({ name: 'equipmentId', select: false })
  equipmentId: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.exercises, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'equipmentId' })
  equipment: Equipment;

  @Column({ name: 'primaryMuscleId', select: false })
  primaryMuscleId: number;

  @ManyToOne(() => Muscle, (muscle) => muscle.primaryExercises, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'primaryMuscleId' })
  primaryMuscle: Muscle;

  @ManyToMany(() => Muscle, (muscle) => muscle.secondaryExercises, {
    eager: true,
  })
  @JoinTable({
    name: 'exercise_secondary_muscles',
    joinColumn: {
      name: 'exerciseId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'muscleId',
      referencedColumnName: 'id',
    },
  })
  secondaryMuscles: Muscle[];

  @OneToMany(
    () => RoutineExercise,
    (routineExercise) => routineExercise.exercise,
  )
  routineExercises: RoutineExercise[];
}
