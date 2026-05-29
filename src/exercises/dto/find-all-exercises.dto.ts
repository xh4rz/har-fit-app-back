import { IsOptional, IsPositive, Min } from 'class-validator';

export class FindAllExercisesDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsPositive()
  primaryMuscleId?: number;

  @IsOptional()
  @IsPositive()
  equipmentId?: number;
}
