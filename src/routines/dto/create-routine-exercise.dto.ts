import {
  IsUUID,
  ArrayMinSize,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoutineExerciseSetDto } from './create-routine-exercise-set.dto';

export class CreateRoutineExerciseDto {
  @IsUUID()
  exerciseId: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(300)
  restTimer?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineExerciseSetDto)
  sets: CreateRoutineExerciseSetDto[];
}
