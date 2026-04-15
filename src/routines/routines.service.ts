import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';
import { User } from '../auth/entities/user.entity';
import { RoutineExerciseItem } from './interfaces';
import { RoutineExercise } from './entities/routine-exercise.entity';
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
        routineExercises: exercises.flatMap((exercise) =>
          exercise.sets.map((set, index) => ({
            set: index + 1,
            reps: set.reps,
            kg: set.kg,
            exercise: { id: exercise.exerciseId },
          })),
        ),
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

        routine.routineExercises = exercises.flatMap((exercise) =>
          exercise.sets.map((set, index) =>
            this.routineExerciseRepository.create({
              set: index + 1,
              reps: set.reps,
              kg: set.kg,
              exercise: { id: exercise.exerciseId },
              routine,
            }),
          ),
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
    const grouped = Object.groupBy(
      routine.routineExercises,
      (item) => item.exercise.id,
    ) as Record<string, RoutineExerciseItem[]>;

    return {
      id: routine.id,
      title: routine.title,
      exercises: Object.values(grouped).map((group) => ({
        exerciseId: group[0].exercise.id,
        title: group[0].exercise.title,
        video: group[0].exercise.video.url,
        primaryMuscleName: group[0].exercise.primaryMuscle.name,
        sets: group.map(({ set, reps, kg }) => ({ set, reps, kg })),
      })),
    };
  }
}
