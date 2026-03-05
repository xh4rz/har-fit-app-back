import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Exercise } from '../../exercises/entities';

@Entity({ name: 'muscles' })
export class Muscle {
  @PrimaryColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  imageUrl: string;

  @OneToMany(() => Exercise, (exercise) => exercise.primaryMuscle)
  primaryExercises: Exercise[];

  @ManyToMany(() => Exercise, (exercise) => exercise.secondaryMuscles)
  secondaryExercises: Exercise[];
}
