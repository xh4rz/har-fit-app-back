import { IsInt, IsNumber, Min } from 'class-validator';

export class RoutineSetDto {
  @IsInt()
  @Min(1)
  set: number;

  @IsInt()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(0)
  kg: number;
}
