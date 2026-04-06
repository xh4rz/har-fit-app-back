import { IsUUID, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { RoutineSetDto } from './routine.set.dto';
import { Type } from 'class-transformer';

export class CreateRoutineExerciseDto {
  @IsUUID()
  exerciseId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RoutineSetDto)
  sets: RoutineSetDto[];
}
