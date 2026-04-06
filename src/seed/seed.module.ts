import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Exercise, ExerciseVideo } from '../exercises/entities';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Muscle } from '../muscles/entities/muscle.entity';
import { Routine } from '../routines/entities/routine.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Exercise,
      ExerciseVideo,
      Equipment,
      Muscle,
      Routine,
    ]),
  ],
})
export class SeedModule {}
