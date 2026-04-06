import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Routine } from './entities/routine.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService],
  imports: [
    TypeOrmModule.forFeature([Routine, RoutineExercise]),
    AuthModule,
    CommonModule,
  ],
})
export class RoutinesModule {}
