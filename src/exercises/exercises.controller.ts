import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import {
  CreateExerciseDto,
  FindAllExercisesDto,
  UpdateExerciseDto,
} from './dto';
import { Auth } from '../auth/decorators';
import { VideoFileUpload } from '../common/decorators';
import { ValidRoles } from '../auth/interfaces';
import { ValidateMusclesPipe } from './pipes/validate-muscles.pipe';

@ApiBearerAuth()
@Auth()
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Auth(ValidRoles.admin)
  @Post()
  @VideoFileUpload()
  create(
    @Body(ValidateMusclesPipe) createExerciseDto: CreateExerciseDto,
    @UploadedFile(new ParseFilePipe()) file: Express.Multer.File,
  ) {
    return this.exercisesService.create(createExerciseDto, file);
  }

  @Get()
  findAll(@Query() findAllExercisesDto: FindAllExercisesDto) {
    return this.exercisesService.findAll(findAllExercisesDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.exercisesService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  @VideoFileUpload()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidateMusclesPipe) updateExerciseDto: UpdateExerciseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.exercisesService.update(id, updateExerciseDto, file);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.exercisesService.remove(id);
  }
}
