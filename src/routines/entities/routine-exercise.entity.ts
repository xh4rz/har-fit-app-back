import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Routine } from './routine.entity';
import { Exercise } from '@/exercises/entities';
import { RoutineExerciseSet } from './';

@Entity({
  name: 'routines_exercises',
})
export class RoutineExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  restTimer: number;

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

  @OneToMany(() => RoutineExerciseSet, (set) => set.routineExercise, {
    eager: true,
    cascade: true,
  })
  sets: RoutineExerciseSet[];
}
