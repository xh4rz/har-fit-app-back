import { IsBoolean, IsInt, IsNumber, Min } from 'class-validator';

export class CreateRoutineExerciseSetDto {
  @IsInt()
  @Min(1)
  set: number;

  @IsInt()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(1)
  kg: number;

  @IsBoolean()
  completed: boolean;
}
