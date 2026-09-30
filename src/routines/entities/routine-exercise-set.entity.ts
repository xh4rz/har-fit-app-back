import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoutineExercise } from '.';

@Entity({
  name: 'routine_exercise_sets',
})
export class RoutineExerciseSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  set: number;

  @Column('int')
  reps: number;

  @Column('float')
  kg: number;

  @ManyToOne(() => RoutineExercise, (routineExercise) => routineExercise.sets, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'routineExerciseId' })
  routineExercise: RoutineExercise;
}
