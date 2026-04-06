import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Routine } from './routine.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity({
  name: 'routines_exercises',
})
export class RoutineExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  set: number;

  @Column()
  reps: number;

  @Column('float')
  kg: number;

  @ManyToOne(() => Routine, (routine) => routine.routineExercises, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'routineId' })
  routine: Routine;

  @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;
}
