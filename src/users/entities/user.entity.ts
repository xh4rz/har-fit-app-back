import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Routine } from '@/routines/entities/routine.entity';
import { UserImage } from './user-image.entity';
import { Workout } from '@/workouts/entities/workout.entity';
import { Gender } from '@/auth/interfaces';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullname: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('text', { nullable: true, select: false })
  refreshToken: string | null;

  @Column('text', { nullable: true })
  description?: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Gender,
  })
  gender?: Gender;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBeforeInsert() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }

    if (this.fullname) {
      this.fullname = this.fullname.toLowerCase().trim();
    }
  }

  @OneToMany(() => Routine, (routine) => routine.user)
  routines: Routine[];

  @OneToOne(() => UserImage, (image) => image.user, {
    cascade: true,
    eager: true,
  })
  image: UserImage;

  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[];
}
