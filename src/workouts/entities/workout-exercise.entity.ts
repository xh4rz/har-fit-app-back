import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exercise } from '@/exercises/entities';
import { Workout, WorkoutExerciseSet } from './';

@Entity({ name: 'workouts_exercises' })
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  restTimer: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;

  @ManyToOne(() => Exercise, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;

  @OneToMany(() => WorkoutExerciseSet, (set) => set.workoutExercise, {
    eager: true,
    cascade: true,
  })
  sets: WorkoutExerciseSet[];
}
