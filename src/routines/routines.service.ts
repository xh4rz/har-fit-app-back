import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto, UpdateRoutineDto } from './dto';
import { Routine, RoutineExercise } from './entities';
import { User } from '@/users/entities/user.entity';
import { DatabaseExceptionService } from '../common/services/database-exception.service';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,

    @InjectRepository(RoutineExercise)
    private readonly routineExerciseRepository: Repository<RoutineExercise>,

    private readonly databaseExceptionService: DatabaseExceptionService,
  ) {}

  async create(createRoutineDto: CreateRoutineDto, user: User) {
    const { exercises, title } = createRoutineDto;

    try {
      const routine = this.routineRepository.create({
        title,
        routineExercises: exercises.map((exercise) => ({
          exercise: { id: exercise.exerciseId },
          restTimer: exercise.restTimer,
          sets: exercise.sets.map((set) => ({
            set: set.set,
            reps: set.reps,
            kg: set.kg,
          })),
        })),
        user,
      });

      await this.routineRepository.save(routine);

      return this.findOne(routine.id);
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async findAll(userId: string) {
    const routines = await this.routineRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return routines.map((routine) => this.transformRoutine(routine));
  }

  async update(id: string, updateRoutineDto: UpdateRoutineDto) {
    const { title, exercises } = updateRoutineDto;

    try {
      const routine = await this.findOneEntity(id);

      if (title) {
        routine.title = title;
      }

      if (exercises) {
        await this.routineExerciseRepository.delete({
          routine: { id },
        });

        routine.routineExercises = exercises.map((exercise) =>
          this.routineExerciseRepository.create({
            exercise: { id: exercise.exerciseId },
            restTimer: exercise.restTimer ?? 0,
            sets: exercise.sets.map((set) => ({
              set: set.set,
              reps: set.reps,
              kg: set.kg,
            })),
          }),
        );
      }

      await this.routineRepository.save(routine);

      return this.findOne(id);
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const routine = await this.findOneEntity(id);

    await this.routineRepository.remove(routine);
  }

  async findOne(id: string) {
    const routine = await this.findOneEntity(id);

    return this.transformRoutine(routine);
  }

  private async findOneEntity(id: string) {
    const routine = await this.routineRepository.findOne({
      where: { id },
    });

    if (!routine)
      throw new NotFoundException(`Routine with id "${id}" not found`);

    return routine;
  }

  private transformRoutine(routine: Routine) {
    return {
      id: routine.id,
      title: routine.title,
      exercises: routine.routineExercises.map((routineExercise) => ({
        exerciseId: routineExercise.exercise.id,
        title: routineExercise.exercise.title,
        video: routineExercise.exercise.video.url,
        primaryMuscleName: routineExercise.exercise.primaryMuscle.name,
        restTimer: routineExercise.restTimer,
        sets: routineExercise.sets.map(({ set, reps, kg }) => ({
          set,
          reps,
          kg,
        })),
      })),
    };
  }
}
