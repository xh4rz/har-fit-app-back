import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout, WorkoutExercise, WorkoutExerciseSet } from './entities';
import { CommonModule } from '@/common/common.module';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [
    TypeOrmModule.forFeature([Workout, WorkoutExercise, WorkoutExerciseSet]),
    CommonModule,
  ],
})
export class WorkoutsModule {}
