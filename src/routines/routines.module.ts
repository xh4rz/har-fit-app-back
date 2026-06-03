import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Routine } from './entities/routine.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { CommonModule } from '@/common/common.module';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService],
  imports: [TypeOrmModule.forFeature([Routine, RoutineExercise]), CommonModule],
})
export class RoutinesModule {}
