import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Muscle } from './entities/muscle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusclesService {
  constructor(
    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,
  ) {}

  async findAll() {
    try {
      return await this.muscleRepository.find();
    } catch {
      throw new InternalServerErrorException('Error fetching muscles');
    }
  }
}
