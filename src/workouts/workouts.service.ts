import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseExceptionService } from '@/common/services';
import { Workout } from './entities';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,

    private readonly databaseExceptionService: DatabaseExceptionService,
  ) {}

  async create(userId: string, createWorkoutDto: CreateWorkoutDto) {
    const { title, duration, description, exercises } = createWorkoutDto;

    try {
      const workoutExercises = exercises
        .map(({ exerciseId, sets, ...exercise }) => {
          const completedSets = sets.filter(({ completed }) => completed);

          return {
            ...exercise,
            exercise: { id: exerciseId },
            sets: completedSets,
          };
        })
        .filter(({ sets }) => sets.length > 0);

      const sets = workoutExercises.reduce(
        (total, exercise) => total + exercise.sets.length,
        0,
      );

      const volume = workoutExercises.reduce(
        (total, exercise) =>
          total +
          exercise.sets.reduce(
            (exerciseVolume, set) => exerciseVolume + set.kg * set.reps,
            0,
          ),
        0,
      );

      const workout = this.workoutRepository.create({
        title,
        duration,
        description,
        volume,
        sets,
        workoutExercises,
        user: { id: userId },
      });

      await this.workoutRepository.save(workout);

      return this.findOne(workout.id);
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const workout = await this.workoutRepository.findOne({
      where: { id },
    });

    if (!workout) {
      this.workoutNotFound(id);
    }

    return this.transformWorkout(workout);
  }

  async findAll(userId: string) {
    const workouts = await this.workoutRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return workouts.map((workout) => this.transformWorkout(workout));
  }

  // update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
  //   return `This action updates a #${id} workout`;
  // }

  async remove(id: string) {
    const result = await this.workoutRepository.delete(id);

    if (result.affected === 0) {
      this.workoutNotFound(id);
    }
  }

  private transformWorkout(workout: Workout) {
    return {
      id: workout.id,
      title: workout.title,
      duration: workout.duration,
      description: workout.description,
      volume: workout.volume,
      sets: workout.sets,
      createdAt: workout.createdAt,
      exercises: workout.workoutExercises.map((workoutExercise) => ({
        exerciseId: workoutExercise.exercise.id,
        title: workoutExercise.exercise.title,
        video: workoutExercise.exercise.video.url,
        primaryMuscleName: workoutExercise.exercise.primaryMuscle.name,
        restTimer: workoutExercise.restTimer,
        sets: workoutExercise.sets.map(({ id: _, ...set }) => set),
      })),
    };
  }

  private workoutNotFound(id: string): never {
    throw new NotFoundException(`Workout with id "${id}" not found`);
  }
}
