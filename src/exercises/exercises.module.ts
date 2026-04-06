import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Exercise, ExerciseVideo } from './entities';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Muscle } from '../muscles/entities/muscle.entity';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseVideo, Equipment, Muscle]),
    AuthModule,
    CloudinaryModule,
    CommonModule,
  ],
})
export class ExercisesModule {}
