import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import {
  CreateExerciseDto,
  FindAllExercisesDto,
  UpdateExerciseDto,
} from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryResponse } from '../cloudinary/interfaces/cloudinary-response';
import { Exercise, ExerciseVideo } from './entities';
import { DatabaseExceptionService } from '../common/services';

import { Muscle } from '../muscles/entities/muscle.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseVideo)
    private readonly exerciseVideoRepository: Repository<ExerciseVideo>,

    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,

    private readonly cloudinaryService: CloudinaryService,

    private readonly databaseExceptionService: DatabaseExceptionService,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    file: Express.Multer.File,
  ) {
    const { secondaryMuscleIds = [], ...rest } = createExerciseDto;

    let uploadResult: CloudinaryResponse | undefined;

    try {
      uploadResult = await this.cloudinaryService.uploadFile(file);

      const secondaryMuscles = await this.muscleRepository.find({
        where: { id: In(secondaryMuscleIds) },
      });

      const exercise = this.exerciseRepository.create({
        ...rest,
        secondaryMuscles,
        video: this.exerciseVideoRepository.create({
          publicId: uploadResult.public_id,
          url: uploadResult.secure_url,
        }),
      });

      await this.exerciseRepository.save(exercise);

      return this.findOne(exercise.id);
    } catch (error) {
      if (uploadResult?.public_id) {
        await this.cloudinaryService.deleteFile(
          uploadResult.public_id,
          'video',
        );
      }

      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async findAll(findAllExercisesDto: FindAllExercisesDto) {
    const {
      limit = 10,
      offset = 0,
      primaryMuscleId = 0,
      equipmentId = 0,
    } = findAllExercisesDto;

    const where: FindOptionsWhere<Exercise> = {};

    if (primaryMuscleId && primaryMuscleId !== 1) {
      where.primaryMuscle = {
        id: primaryMuscleId,
      };
    }

    if (equipmentId && equipmentId !== 1) {
      where.equipment = {
        id: equipmentId,
      };
    }

    const exercises = await this.exerciseRepository.find({
      where,
      take: limit,
      skip: offset,
    });

    return exercises.map((exercise) => ({
      ...exercise,
      video: exercise.video.url,
    }));
  }

  async findOne(id: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
    });

    if (!exercise)
      throw new NotFoundException(`Exercise with id "${id}" not found`);

    return {
      ...exercise,
      video: exercise?.video.url,
    };
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
    file?: Express.Multer.File,
  ) {
    const { secondaryMuscleIds = [], ...rest } = updateExerciseDto;
    let uploadResult: CloudinaryResponse | undefined;

    const exercise = await this.exerciseRepository.findOne({ where: { id } });

    if (!exercise) {
      throw new NotFoundException(`Exercise with id "${id}" not found`);
    }

    try {
      if (file) {
        const oldPublicId = exercise.video.publicId;
        uploadResult = await this.cloudinaryService.uploadFile(file);

        await this.exerciseVideoRepository.update(exercise.video.id, {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        });

        if (oldPublicId) {
          await this.cloudinaryService.deleteFile(oldPublicId, 'video');
        }
      }

      await this.exerciseRepository
        .createQueryBuilder()
        .update(Exercise)
        .set(rest)
        .where('id = :id', { id })
        .execute();

      if (secondaryMuscleIds.length > 0) {
        const secondaryMuscles = await this.muscleRepository.find({
          where: { id: In(secondaryMuscleIds) },
        });

        await this.exerciseRepository
          .createQueryBuilder()
          .relation(Exercise, 'secondaryMuscles')
          .of(id)
          .addAndRemove(
            secondaryMuscles.map((m) => m.id),
            exercise.secondaryMuscles.map((m) => m.id),
          );
      } else {
        await this.exerciseRepository
          .createQueryBuilder()
          .relation(Exercise, 'secondaryMuscles')
          .of(id)
          .remove(exercise.secondaryMuscles.map((m) => m.id));
      }

      return this.findOne(id);
    } catch (error) {
      if (uploadResult?.public_id) {
        await this.cloudinaryService.deleteFile(
          uploadResult.public_id,
          'video',
        );
      }

      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
    });

    if (!exercise)
      throw new NotFoundException(`Exercise with id "${id}" not found`);

    await this.cloudinaryService.deleteFile(exercise.video.publicId, 'video');

    await this.exerciseRepository.remove(exercise);
  }

  async deleteAllExercises() {
    const query = this.exerciseRepository.createQueryBuilder('exercise');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }
}
