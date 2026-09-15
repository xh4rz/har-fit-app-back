import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@/common/common.module';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Routine, RoutineExercise, RoutineExerciseSet } from './entities';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService],
  imports: [
    TypeOrmModule.forFeature([Routine, RoutineExercise, RoutineExerciseSet]),
    CommonModule,
  ],
})
export class RoutinesModule {}
