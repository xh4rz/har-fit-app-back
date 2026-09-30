import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity({ name: 'workouts' })
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('int')
  duration: number;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('float')
  volume: number;

  @Column('int')
  sets: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
      eager: true,
    },
  )
  workoutExercises: WorkoutExercise[];

  @ManyToOne(() => User, (user) => user.workouts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
