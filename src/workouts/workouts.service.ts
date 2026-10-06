import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseExceptionService } from '@/common/services';
import { Workout, WorkoutExercise } from './entities';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,

    @InjectRepository(WorkoutExercise)
    private readonly workoutExerciseRepository: Repository<WorkoutExercise>,

    private readonly databaseExceptionService: DatabaseExceptionService,
  ) {}

  async create(userId: string, createWorkoutDto: CreateWorkoutDto) {
    const { title, duration, description, exercises } = createWorkoutDto;

    try {
      const { workoutExercises, sets, volume } = this.getWorkoutData(exercises);

      const workout = this.workoutRepository.create({
        title,
        duration,
        description,
        sets,
        volume,
        workoutExercises,
        user: { id: userId },
      });

      await this.workoutRepository.save(workout);

      return this.findOne(workout.id);
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
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

  async findOne(id: string) {
    const workout = await this.getWorkout(id);

    return this.transformWorkout(workout);
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    const { exercises, ...data } = updateWorkoutDto;

    try {
      const workout = await this.getWorkout(id);

      Object.assign(workout, data);

      if (exercises) {
        await this.workoutExerciseRepository.delete({
          workout: { id },
        });

        const workoutData = this.getWorkoutData(exercises);

        workout.sets = workoutData.sets;
        workout.volume = workoutData.volume;

        workout.workoutExercises = workoutData.workoutExercises.map(
          (workoutExercise) =>
            this.workoutExerciseRepository.create({
              ...workoutExercise,
              workout,
            }),
        );
      }

      await this.workoutRepository.save(workout);

      return this.findOne(id);
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const workout = await this.getWorkout(id);

    await this.workoutRepository.remove(workout);
  }

  private async getWorkout(id: string) {
    const workout = await this.workoutRepository.findOne({
      where: { id },
    });

    if (!workout) {
      this.workoutNotFound(id);
    }

    return workout;
  }

  private getWorkoutData(exercises: CreateWorkoutDto['exercises']) {
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

    return {
      workoutExercises,
      sets,
      volume,
    };
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
      updatedAt: workout.updatedAt,
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
