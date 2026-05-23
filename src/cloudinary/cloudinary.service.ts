import { Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary, ResourceType } from 'cloudinary';
import { CloudinaryResponse } from './interfaces/cloudinary-response';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'exercises',
        },
        (error, result) => {
          if (error) return reject(error);

          if (!result) {
            return reject(new Error('Cloudinary did not return a result'));
          }

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string, resourceType: ResourceType) {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  }

  async getFileUrl(
    publicId: string,
    resourceType: ResourceType,
  ): Promise<{ url: string }> {
    await this.fileExists(publicId, resourceType);

    return {
      url: cloudinary.url(`exercises/${publicId}`, {
        resource_type: resourceType,
      }),
    };
  }

  async fileExists(
    publicId: string,
    resourceType: ResourceType,
  ): Promise<boolean> {
    try {
      const result = await cloudinary.api.resource(`exercises/${publicId}`, {
        resource_type: resourceType,
      });

      return !!result;
    } catch (error) {
      if (error.error.http_code === 404)
        throw new NotFoundException(error.error.message);

      throw error;
    }
  }
}
