import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { Auth } from '@/auth/decorators';

@ApiBearerAuth()
@Auth()
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Get('file/:id')
  getVideoUrl(@Param('id') publicId: string) {
    return this.cloudinaryService.getFileUrl(publicId, 'video');
  }
}
