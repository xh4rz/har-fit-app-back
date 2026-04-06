import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { In, Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { Exercise, ExerciseVideo } from '../exercises/entities';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Muscle } from '../muscles/entities/muscle.entity';
import { Routine } from '../routines/entities/routine.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseVideo)
    private readonly exerciseVideoRepository: Repository<ExerciseVideo>,

    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,

    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,

    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    await this.insertUsers();

    await this.insertEquipment();

    await this.insertMuscle();

    await this.insertNewExercies();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.exerciseRepository.createQueryBuilder().delete().execute();

    await this.equipmentRepository.createQueryBuilder().delete().execute();

    await this.muscleRepository.createQueryBuilder().delete().execute();

    await this.userRepository.createQueryBuilder().delete().execute();

    await this.routineRepository.createQueryBuilder().delete().execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users = await this.userRepository.save(seedUsers);

    return users;
  }

  private async insertEquipment() {
    const equipments = await this.equipmentRepository.save(
      initialData.equipments,
    );

    return equipments;
  }

  private async insertMuscle() {
    const muscles = await this.muscleRepository.save(initialData.muscles);

    return muscles;
  }

  private async insertNewExercies() {
    const exercises = initialData.exercises;

    const exerciseEntities = await Promise.all(
      exercises.map(async (exercise) => {
        const equipment = await this.equipmentRepository.findOneBy({
          id: exercise.equipmentId,
        });

        if (!equipment)
          throw new Error(`Equipment not found: ${exercise.equipmentId}`);

        const primaryMuscle = await this.muscleRepository.findOneBy({
          id: exercise.primaryMuscleId,
        });

        if (!primaryMuscle)
          throw new Error(
            `Primary muscle not found: ${exercise.primaryMuscleId}`,
          );

        const secondaryMuscleIds = exercise.secondaryMuscleIds ?? [];

        const secondaryMuscles = await this.muscleRepository.findBy({
          id: In(secondaryMuscleIds),
        });

        return this.exerciseRepository.create({
          ...exercise,
          equipment,
          primaryMuscle,
          secondaryMuscles,
          video: this.exerciseVideoRepository.create({
            url: exercise.file.url,
            publicId: exercise.file.publicId,
          }),
        });
      }),
    );

    await this.exerciseRepository.save(exerciseEntities);

    return true;
  }
}
