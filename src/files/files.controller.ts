import type { Response } from 'express';
import {
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileVideoFilter } from '../common/helpers';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('exercise')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/exercises',
        filename: fileNamer,
      }),
      fileFilter: fileVideoFilter,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  )
  create(@UploadedFile(new ParseFilePipe()) file: Express.Multer.File) {
    return `${this.configService.get<string>('hostApi')}/files/exercise/${file.filename}`;
  }

  @Get('exercise/:videoName')
  findExerciseVideo(
    @Res() res: Response,
    @Param('videoName') videoName: string,
  ) {
    const path = this.filesService.getStaticExerciseVideo(videoName);

    res.sendFile(path);
  }
}
