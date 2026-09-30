import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
// import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Auth, GetUser } from '@/auth/decorators';

@ApiBearerAuth()
@Auth()
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return this.workoutsService.create(userId, createWorkoutDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.workoutsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workoutsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
  //   return this.workoutsService.update(+id, updateWorkoutDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.workoutsService.remove(id);
  }
}
