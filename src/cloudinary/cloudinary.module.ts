import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryController } from './cloudinary.controller';
import { AuthModule } from '@/auth/auth.module';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService],
  imports: [AuthModule],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
