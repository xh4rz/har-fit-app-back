import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoutineExercise } from './routine-exercise.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'routines' })
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @OneToMany(
    () => RoutineExercise,
    (routineExercise) => routineExercise.routine,
    { cascade: true, eager: true },
  )
  routineExercises: RoutineExercise[];

  @ManyToOne(() => User, (user) => user.routines, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
