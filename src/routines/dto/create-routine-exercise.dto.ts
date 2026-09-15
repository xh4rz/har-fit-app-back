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
import { RoutineSetDto } from './routine.set.dto';
import { Type } from 'class-transformer';

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
  @Type(() => RoutineSetDto)
  sets: RoutineSetDto[];
}
