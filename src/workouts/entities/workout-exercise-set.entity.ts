import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutExercise } from '.';

@Entity({
  name: 'workout_exercise_sets',
})
export class WorkoutExerciseSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  set: number;

  @Column('int')
  reps: number;

  @Column('float')
  kg: number;

  @Column('boolean', {
    default: false,
  })
  completed: boolean;

  @ManyToOne(() => WorkoutExercise, (workoutExercise) => workoutExercise.sets, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'workoutExerciseId' })
  workoutExercise: WorkoutExercise;
}
