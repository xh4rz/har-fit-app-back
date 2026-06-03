import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Muscle } from '@/muscles/entities/muscle.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';

@Injectable()
export class ValidateMusclesPipe implements PipeTransform<CreateExerciseDto> {
  constructor(
    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,
  ) {}

  async transform(value: CreateExerciseDto): Promise<CreateExerciseDto> {
    const ids = value.secondaryMuscleIds;

    if (!Array.isArray(ids) || ids.length === 0) {
      return value;
    }

    const muscles = await this.muscleRepository.find({
      where: { id: In(ids) },
    });

    if (muscles.length !== ids.length) {
      const foundIds = muscles.map((m) => m.id);
      const invalidIds = ids.filter((id) => !foundIds.includes(id));

      throw new BadRequestException(
        `Invalid secondaryMuscleIds: ${invalidIds.join(', ')}`,
      );
    }

    return value;
  }
}
